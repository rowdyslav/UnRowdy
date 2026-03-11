import type { AxiosError } from 'axios'
import type { ErrorResponseType } from '@/shared/types/errorResponseType.ts'

const asAxiosError = (err: unknown): AxiosError<ErrorResponseType> | null => {
  if (typeof err !== 'object' || err === null) {
    return null
  }

  return err as AxiosError<ErrorResponseType>
}

const getDetail = (err: unknown): string | null => {
  const axiosError = asAxiosError(err)
  const detail = axiosError?.response?.data?.detail

  if (typeof detail === 'string') {
    return detail.toLowerCase()
  }

  return null
}

const getStatus = (err: unknown): number | undefined => {
  const axiosError = asAxiosError(err)
  return axiosError?.response?.status
}

export const toLoginError = (err: unknown): Error => {
  const status = getStatus(err)
  if (status === 401) {
    return new Error('Неверный email или пароль')
  }

  const detail = getDetail(err)
  if (detail?.includes('invalid credentials')) {
    return new Error('Неверный email или пароль')
  }

  return new Error('Ошибка авторизации')
}

export const toRegisterError = (err: unknown): Error => {
  const status = getStatus(err)
  if (status === 409) {
    return new Error('Пользователь с таким email или username уже существует')
  }

  const detail = getDetail(err)
  if (detail?.includes('exists') || detail?.includes('существ')) {
    return new Error('Пользователь с таким email или username уже существует')
  }

  return new Error('Ошибка регистрации')
}
