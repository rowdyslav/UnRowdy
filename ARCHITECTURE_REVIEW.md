# Анализ архитектуры, файловой организации и системы импортов

Дата: 2026-03-18

## Краткий вывод

Проект в целом читается как три почти независимых приложения, собранных в один монорепо без общего контракта и без единой дисциплины модульных границ. Это не критично для текущего масштаба, но уже создаёт несколько системных узких мест:

1. `backend`, `frontend` и `tma` развиваются по разным организационным правилам.
2. Во `frontend` заявлена Feature-Sliced-структура, но фактические зависимости регулярно пересекают слои в обе стороны.
3. `tma` выглядит как отдельное приложение, но без собственной чёткой архитектуры: там мало слоёв, есть глобальный state в `App.tsx`, а API-слой дублирует web-frontend.
4. В `backend` есть нормальное деление на `routers` / `core`, но модульные импорты и точка входа собраны так, будто приложение всегда будет запускаться только из директории `backend`, а не как пакет.

Если коротко: сейчас проект ещё можно держать в голове целиком, но масштабирование будет упираться не в бизнес-логику, а в связанность файлов и размытые границы ответственности.

## Что в целом логично

- Корневое деление на `backend/`, `frontend/`, `tma/` удачное: сразу понятно, где какой runtime.
- Во фронтендах есть алиас `@/*` и он реально используется: [frontend/tsconfig.json](C:/Projects/full/UnRowdy/frontend/tsconfig.json#L11), [tma/tsconfig.json](C:/Projects/full/UnRowdy/tma/tsconfig.json#L7).
- В backend есть базовое разделение на `routers`, `models`, `schemas`, `deps`, `auth`, что для небольшого FastAPI-проекта уместно.
- Во `frontend` хотя бы номинально есть слои `app / pages / widgets / features / entities / shared`.

## Системные нелогичности на уровне всего репо

### 1. Три части проекта не делят общий контракт

Сейчас контракт между backend и двумя клиентами размазан вручную:

- web хранит типы и API в `frontend/src/shared/api/*`
- tma хранит почти те же сущности в `tma/src/share/api/*`
- backend живёт со своими Pydantic-схемами отдельно

Следствие: изменение ответа сервера почти гарантированно требует ручной синхронизации в трёх местах. Уже видно дублирование по сервисам и категориям:

- [frontend/src/shared/api/service/serviceApi.ts](C:/Projects/full/UnRowdy/frontend/src/shared/api/service/serviceApi.ts)
- [tma/src/share/api/service/serviceApi.ts](C:/Projects/full/UnRowdy/tma/src/share/api/service/serviceApi.ts)

Это главный организационный долг всего репо.

### 2. Несогласованное именование слоёв

Во web используется `shared`, а в TMA используется `share`:

- `frontend/src/shared/...`
- `tma/src/share/...`

Это мелочь только внешне. На практике это означает, что два клиента не просто разные, а концептуально не синхронизированы даже на уровне словаря проекта.

### 3. Нет единого стандарта модульных границ

- `frontend` подключает `@feature-sliced/eslint-config`: [frontend/eslint.config.js](C:/Projects/full/UnRowdy/frontend/eslint.config.js#L15)
- `tma` вообще не использует аналогичных правил: [tma/eslint.config.js](C:/Projects/full/UnRowdy/tma/eslint.config.js#L12)
- `backend` не оформлен как устойчивый пакет с импортами через `backend.*`

Итог: в одном репо сосуществуют три разных модели организации, а это усложняет сопровождение больше, чем разница стеков.

## Backend

### Сильные стороны

- Есть понятный центр доменной модели: `core/models.py`, `core/schemas.py`.
- Все роуты сведены через один агрегатор: [backend/routers/**init**.py](C:/Projects/full/UnRowdy/backend/routers/__init__.py#L7).
- Для маленького API деление на `routers` и `core` достаточно.

### Главная нелогичность: backend формально пакет, но импортируется как набор top-level модулей

Точка входа использует такие импорты:

- [backend/main.py](C:/Projects/full/UnRowdy/backend/main.py#L7)

```py
from db import init_db
from env import ENV
from routers import all_routers
```

То же самое в других местах:

- [backend/db.py](C:/Projects/full/UnRowdy/backend/db.py#L4)
- [backend/core/auth.py](C:/Projects/full/UnRowdy/backend/core/auth.py#L4)
- [backend/routers/users.py](C:/Projects/full/UnRowdy/backend/routers/users.py#L4)

Это означает:

- код зависит от текущей рабочей директории;
- пакетирование через `pyproject.toml` и `packages = ["backend"]` используется не до конца;
- перенос в `uvicorn backend.main:app`, тесты из корня, переиспользование модулей и IDE tooling становятся более хрупкими.

Для Python-проекта это один из главных архитектурных запахов. Если директория называется `backend`, лучше либо честно импортировать `from backend.db import ...`, либо запускать всё как пакет с относительными импортами внутри подпакетов.

### `core/__init__.py` слишком широкий фасад

- [backend/core/**init**.py](C:/Projects/full/UnRowdy/backend/core/__init__.py#L3)

Сейчас `core` реэкспортирует почти всё: auth, deps, ошибки, модели, схемы. Это удобно локально, но создаёт эффект "god namespace":

- роутер импортирует `from core import (...)`, не показывая, зависит он от схем, ошибок или БД-моделей;
- внутри `core` повышается риск циклических импортов;
- любой новый модуль хочется просто "докинуть" в `__init__`, а это скрывает реальные связи.

Для маленького проекта это терпимо, но как только появятся сервисы, события, background jobs или отдельные домены, такой фасад начнёт мешать.

### `db.py` смешивает инфраструктуру и бизнес-инициализацию

- [backend/db.py](C:/Projects/full/UnRowdy/backend/db.py#L7)
- [backend/db.py](C:/Projects/full/UnRowdy/backend/db.py#L11)
- [backend/db.py](C:/Projects/full/UnRowdy/backend/db.py#L132)

В одном модуле находятся:

- клиент Mongo;
- выбор БД;
- инициализация Beanie;
- синхронизация справочника категорий;
- логика очистки/восстановления дерева категорий.

То есть файл называется как инфраструктурный, но внутри живёт и инфраструктура, и бизнес-правило старта приложения. Это не катастрофа, но это уже граница, через которую файл начинает разрастаться не по одному поводу для изменения.

Лучше разделять хотя бы так:

- `db.py` или `infrastructure/db.py`: подключение и `init_beanie`
- `services/category_sync.py`: синхронизация дерева категорий
- `startup.py` или `main.py`: orchestration

### Именование `service_categories` в роутере логически выбивается

- [backend/routers/service_categories.py](C:/Projects/full/UnRowdy/backend/routers/service_categories.py#L6)

Роутер называется `service_categories`, но работает под префиксом `/services` и добавляет `/categories/...`. Формально это работает, но структура "название файла = сущность", "prefix = другая сущность" повышает когнитивную цену навигации.

Либо:

- файл `categories.py` и prefix `/categories`

либо:

- файл `service_categories.py` и prefix `/service-categories`

Сейчас ни один из вариантов не выражен прямо.

## Frontend

### Сильные стороны

- Есть понятная верхнеуровневая FSD-подобная раскладка.
- Алиасы путей настроены корректно: [frontend/tsconfig.json](C:/Projects/full/UnRowdy/frontend/tsconfig.json#L15).
- Большинство импортов идут через `@/...`, а не через длинные `../../../`.

### Главная проблема: декларируется FSD, но границы слоёв размыты

Формально у проекта есть `app / pages / widgets / features / entities / shared`, плюс ESLint-конфиг с FSD:

- [frontend/eslint.config.js](C:/Projects/full/UnRowdy/frontend/eslint.config.js#L15)

Но фактические зависимости регулярно идут "вверх" и "вбок":

- `entities` зависит от `features`: [frontend/src/entities/service/ui/ActiveList.tsx](C:/Projects/full/UnRowdy/frontend/src/entities/service/ui/ActiveList.tsx#L6)
- `entities` зависит от `app` store: [frontend/src/entities/service/api/useServices.ts](C:/Projects/full/UnRowdy/frontend/src/entities/service/api/useServices.ts#L3), [frontend/src/entities/user/api/useFriends.ts](C:/Projects/full/UnRowdy/frontend/src/entities/user/api/useFriends.ts#L5)
- `shared/api` зависит от `app` store и роутинга: [frontend/src/shared/api/axios.ts](C:/Projects/full/UnRowdy/frontend/src/shared/api/axios.ts#L2)
- `shared/api/auth.ts` зависит от `features/auth/model`: [frontend/src/shared/api/auth.ts](C:/Projects/full/UnRowdy/frontend/src/shared/api/auth.ts#L3)
- `entities/service/api/useAllServices.ts` зависит от `features/filterCategory`: [frontend/src/entities/service/api/useAllServices.ts](C:/Projects/full/UnRowdy/frontend/src/entities/service/api/useAllServices.ts#L2)

То есть слои есть, но они не являются архитектурными границами, только папками.

### `shared` перестал быть shared

Самый показательный пример:

- [frontend/src/shared/api/axios.ts](C:/Projects/full/UnRowdy/frontend/src/shared/api/axios.ts#L2)

`shared/api/axios.ts` тянет:

- auth store из `app`
- notification store из `app`
- route constants
- побочный redirect через `window.location`

После этого `shared` уже нельзя считать базовым слоем. Это не shared utility, а инфраструктурный модуль приложения, знающий про auth-flow и UI side effects.

Проблема не только эстетическая. Из-за этого:

- любой API-клиент неотделим от web-приложения;
- его нельзя нормально переиспользовать;
- тестирование и миграция auth-flow становятся дороже.

Такой модуль логичнее лежал бы в `app/api`, `app/http` или `shared/api/core` без знания про UI, а redirect/notifications жили бы выше.

### Сущности и дружба смешаны с сервисами

Самая заметная организационная нелогичность во frontend:

- [frontend/src/pages/profile/ui/FriendsSection.tsx](C:/Projects/full/UnRowdy/frontend/src/pages/profile/ui/FriendsSection.tsx#L1)

Компонент секции друзей импортирует:

- `RequestList` из `entities/service/ui/requestList`
- `ActiveList` из `entities/service/ui/ActiveList`

Но по смыслу это не сервисы, а друзья/пользователи. Это явный сигнал, что файловая организация разошлась с доменной моделью. Позже такие папки становятся ловушкой: разработчик ищет friend UI в `user` или `friends`, а находит в `service`.

### `app/providers` фактически хранит глобальный runtime state

Папка называется `providers`, но внутри лежат zustand stores:

- `authStore`
- `userStore`
- `NotificationStore`
- `confirmStore`

То есть это не только React providers, а и глобальные application stores. Название папки занижает её роль. Более логично было бы:

- `app/stores`
- `app/state`
- либо отдельное деление `providers/` и `stores/`

Иначе новый человек ожидает там composition layer, а получает глобальное состояние.

### Слишком много coupling через конкретные form schemas

`shared/api/auth.ts` типизирован через формы feature-слоя:

- [frontend/src/shared/api/auth.ts](C:/Projects/full/UnRowdy/frontend/src/shared/api/auth.ts#L3)

Это переворачивает зависимость: инфраструктурный клиент знает о конкретной форме UI. Правильнее наоборот:

- `shared` или `entities/user` задают request DTO
- `features/auth` адаптирует form schema к DTO

Иначе любое изменение формы сразу делает API-модуль зависимым от UI-решения.

### Query keys распределены нелогично

Есть:

- [frontend/src/features/friends/config/queryKeys.ts](C:/Projects/full/UnRowdy/frontend/src/features/friends/config/queryKeys.ts)
- [frontend/src/entities/service/config/queryKeys.ts](C:/Projects/full/UnRowdy/frontend/src/entities/service/config/queryKeys.ts)

Но используются они не строго внутри одного слоя. Например `entities/user/api/useFriends.ts` тянет ключи из `features/friends`, хотя query keys по своей природе скорее принадлежат доменному data-access слою, а не UI-feature.

Это не баг, но организационно ухудшает предсказуемость: где искать data contract, в `feature`, `entity` или `shared`?

### Есть следы нескольких стилей кодирования одновременно

Во frontend заметно смешение:

- где-то аккуратный стиль с одинарными кавычками;
- где-то semicolon-heavy стиль и двойные кавычки;
- где-то PascalCase файлов, где-то lower-case (`filterCategory.tsx`, `profileServices.tsx`).

Это не ключевая архитектурная проблема, но хороший индикатор, что модульная структура пока не поддерживается дисциплиной проекта.

## TMA

### Сильные стороны

- Размер приложения пока небольшой, поэтому отсутствие сильной модульности ещё не критично.
- Алиас `@` настроен и используется.
- Клиент технически отделён от web-frontend.

### Главная проблема: TMA пока больше похож на прототип, чем на самостоятельный модуль

Это видно по нескольким признакам:

- пакет даже не переименован: [tma/package.json](C:/Projects/full/UnRowdy/tma/package.json#L2)
- слой называется `share`, а не `shared`
- глобальный state и навигация держатся в корневом `App.tsx`: [tma/src/app/App.tsx](C:/Projects/full/UnRowdy/tma/src/app/App.tsx#L11)

То есть архитектура TMA сейчас крутится вокруг одного большого composition-файла.

### `App.tsx` одновременно выполняет слишком много ролей

- [tma/src/app/App.tsx](C:/Projects/full/UnRowdy/tma/src/app/App.tsx#L11)

В одном компоненте собраны:

- состояние текущего экрана;
- состояние выбранной категории;
- строка поиска;
- интеграция с Telegram SDK;
- логика кнопки Back;
- orchestration Flicking;
- composition экранов.

Для маленького демо это допустимо, но это уже явный будущий bottleneck. Любое усложнение TMA будет вести к переписыванию именно этого файла.

### `features` слой почти отсутствует как слой

Сейчас в `features` лежит по сути один файл:

- [tma/src/features/SearchInput.tsx](C:/Projects/full/UnRowdy/tma/src/features/SearchInput.tsx)

Но этот компонент зависит от конкретного номера страницы (`currPage === 3`), то есть завязан не на feature, а на конкретную текущую композицию экранов. Это не feature-срез, а часть orchestration/UI flow.

Такой код либо должен жить рядом с экраном, либо в `widgets`, либо в `app` как часть shell-навигации.

### API-слой TMA слишком тонкий и дублирующийся

- [tma/src/share/api/axios.ts](C:/Projects/full/UnRowdy/tma/src/share/api/axios.ts#L3)

В отличие от web тут почти нет инфраструктурной обвязки, но есть полное дублирование базового клиента и типов. То есть:

- повторяется `baseURL`
- повторяются DTO
- повторяются endpoint wrappers

При этом логика авторизации Telegram спрятана не в API-слое, а в `App.tsx`.

В результате TMA neither simple nor layered: часть инфраструктуры в API, часть в корневом компоненте, часть в отдельных хуках.

### Линтинг и архитектурная дисциплина слабее, чем во frontend

- [tma/eslint.config.js](C:/Projects/full/UnRowdy/tma/eslint.config.js#L12)

Тут нет ни правил границ слоёв, ни FSD-ограничений, ни import policy. Значит TMA будет дрейфовать быстрее всего.

## Система импортов

## Что хорошо

- В web и TMA почти нет длинных относительных импортов.
- Алиас `@` реально улучшает перемещение файлов.

## Что плохо

### 1. Алиас сам по себе не решает хаос слоёв

Сейчас `@/` упрощает путь, но одновременно скрывает архитектурные нарушения. Импорт

```ts
import { useAuthStore } from "@/app/providers/auth/authStore.ts";
```

выглядит аккуратно, даже если модуль находится в `shared` или `entities`, где такой доступ уже сомнителен.

### 2. Импорты в backend зависят от режима запуска

Это уже было выше, но как проблема импортной системы это важно отдельно:

- [backend/main.py](C:/Projects/full/UnRowdy/backend/main.py#L7)

Пока запуск идёт из `backend/`, всё работает. Как только понадобится более строгий packaging, тестирование из корня или CI-обвязка, такие импорты станут источником нестабильности.

### 3. Отсутствует единая import-policy между клиентами

- web: `shared`
- tma: `share`
- web: FSD-конфиг
- tma: обычный ESLint

Итог: даже одинаковые по смыслу модули импортируются по разным правилам. Для общего репо это плохой сигнал.

## Самые узкие места по приоритету

### Высокий приоритет

1. Backend не оформлен как устойчивый пакет с предсказуемыми импортами.
2. Во frontend `shared`, `entities` и `features` фактически протекают друг в друга.
3. Web и TMA дублируют API-контракт и типы вместо общего клиента/общих DTO.
4. Домен друзей размазан по `service`-папкам, что ломает навигацию по коду.

### Средний приоритет

1. `core/__init__.py` в backend скрывает реальные зависимости через слишком широкий фасад.
2. `db.py` смешивает инфраструктурный и бизнес-стартовый код.
3. `app/providers` во frontend названа неточно относительно её роли.
4. `tma/src/app/App.tsx` уже стал точкой перегрузки.

### Низкий приоритет, но накапливается

1. `shared` vs `share`.
2. Разные naming conventions файлов.
3. Непоследовательный стиль импортов и форматирования.
4. `tma/package.json` с именем `vite-project`.

## Что я бы поменял без переписывания проекта

### 1. Сначала выровнять правила, а не код

- Backend: перейти на пакетные импорты `backend.*` или на строгие относительные импорты внутри пакета.
- Frontend и TMA: одинаково назвать базовый слой, лучше `shared`.
- Зафиксировать один документ с правилами слоёв и допустимыми импортами.

### 2. Во frontend сделать 3 простых развязки

- Убрать зависимости `shared -> app`.
- Убрать зависимости `shared/api -> features`.
- Переложить friend-related UI/API из `entities/service/*` в `entities/user/*` или `features/friends/*`.

Эти три шага дадут больше пользы, чем косметическое переименование папок.

### 3. Вынести общий клиентский контракт

Минимальный вариант:

- `packages/api-contract` или `shared-contracts`
- DTO, response types, route constants, query param types

Тогда и web, и TMA будут зависеть от одного контракта, а не копировать его.

### 4. В TMA отделить shell от экранов

Разбить текущий `App.tsx` хотя бы на:

- `app/AppShell.tsx`
- `app/telegram.ts`
- `app/navigation.ts` или `app/state.ts`

Тогда TMA перестанет быть завязан на один composition-файл.

### 5. В backend развести инфраструктуру и доменную инициализацию

Минимально:

- `db.py` оставить только для Mongo/Beanie
- синхронизацию категорий вынести в отдельный модуль
- `main.py` оставить как orchestration point

## Итоговая оценка

### Backend

Оценка: 6.5/10

Структура в целом понятная, но импортная модель и широкие фасады делают её менее устойчивой, чем кажется.

### Frontend

Оценка: 5.5/10

Снаружи структура выглядит взрослее, чем есть на самом деле. Главная проблема не в папках, а в том, что слои не ограничивают зависимости.

### TMA

Оценка: 4.5/10

Для маленького приложения ещё нормально, но как самостоятельная часть репо TMA организационно отстаёт сильнее всего.

### Весь репозиторий

Оценка: 5.5/10

Основной риск проекта сейчас не в технологии и не в сложности кода, а в том, что три части развиваются по разным архитектурным привычкам. Если это не выровнять, следующие фичи будут дорожать непропорционально.
