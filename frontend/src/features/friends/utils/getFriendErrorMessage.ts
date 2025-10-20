import type { AxiosError } from 'axios'

export const getFriendErrorMessage = (err: AxiosError) => {
  switch (err.status) {
    case 409:
      return 'Заявка уже отправлена или пользователь ваш друг'
  }
  return 'Не удалось найти пользователя'
}
