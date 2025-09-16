from fastapi import HTTPException

bad_friends_type = HTTPException(400, "Неверный тип друзей!")

user_not_found = HTTPException(404, "Пользователь не найден!")

user_already_existed = HTTPException(409, "Пользователь уже существует!")
friend_request_yourself = HTTPException(
    409, "Нельзя отправить запрос в друзья самому себе"
)
already_friend_or_request = HTTPException(
    409, "Пользователь уже ваш друг или запрос в друзья уже отправлен"
)
user_no_friend_or_request = HTTPException(
    409,
    "Этот пользователь не является вашим другом и"
    " у вас/него нет запроса в друзья от него/вас",
)


wish_not_found = HTTPException(404, "Желание не найдено!")
