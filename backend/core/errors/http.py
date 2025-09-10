from fastapi import HTTPException

user_not_found = HTTPException(404, "Пользователь не найден!")

user_already_existed = HTTPException(409, "Пользователь уже существует!")
friend_request_yourself = HTTPException(
    409, "Нельзя отправить запрос в друзья самому себе"
)
friend_request_already_sent = HTTPException(
    409, "Запрос в друзья уже отправлен этому пользователю"
)
user_no_friend_or_request = HTTPException(
    409,
    "Этот пользователь не является вашим другом и"
    " у вас/него нет запроса в друзья от него/вас",
)


wish_not_found = HTTPException(404, "Желание не найдено!")
