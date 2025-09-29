export type ErrorResponseType = {
  detail: string | Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}