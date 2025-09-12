export type LoginErrorResponse = {
  detail: string | Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}