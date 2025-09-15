export type LoginErrorResponse = {
  detail: string | Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}

export type TokenDataType = {
  "access_token": string;
}