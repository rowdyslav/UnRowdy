from http import HTTPStatus
from typing import Literal

from pydantic import BaseModel

HttpErrorName = Literal[
    "bad_request",
    "unauthorized",
    "payment_required",
    "forbidden",
    "not_found",
    "method_not_allowed",
    "not_acceptable",
    "proxy_authentication_required",
    "request_timeout",
    "conflict",
    "gone",
    "length_required",
    "precondition_failed",
    "payload_too_large",
    "uri_too_long",
    "unsupported_media_type",
    "requested_range_not_satisfiable",
    "expectation_failed",
    "im_a_teapot",
    "misdirected_request",
    "unprocessable_entity",
    "locked",
    "failed_dependency",
    "too_early",
    "upgrade_required",
    "precondition_required",
    "too_many_requests",
    "request_header_fields_too_large",
    "unavailable_for_legal_reasons",
    "internal_server_error",
    "not_implemented",
    "bad_gateway",
    "service_unavailable",
    "gateway_timeout",
    "http_version_not_supported",
    "variant_also_negotiates",
    "insufficient_storage",
    "loop_detected",
    "not_extended",
    "network_authentication_required",
]


class HTTPError(BaseModel):
    """Схема HTTP ошибки."""

    detail: str


class ErrorResponsesDict(dict):
    """Словарь для FastAPI.APIRouter.responses, где ключи — названия HTTP-ошибок.

    Принимает на вход флаги по названиям HTTPStatus только кодов >= 400.
    """

    def __init__(self, *errors: HttpErrorName) -> None:
        super().__init__()
        for error in errors:
            try:
                status = HTTPStatus[error.upper()]
            except KeyError:
                continue
            if status.value < 400:
                continue
            self[status.value] = {"model": HTTPError}
