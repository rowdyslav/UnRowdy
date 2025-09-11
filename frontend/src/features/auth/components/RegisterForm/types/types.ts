export type RegisterErrorResponse = {
  detail: string | Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}

