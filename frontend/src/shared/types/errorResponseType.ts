export type ErrorResponse = {
  detail: string | Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}