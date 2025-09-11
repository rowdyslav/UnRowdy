export type RegisterDataType = {
  email: string;
  password: string;
  username: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type TokenDataType = {
  "access_token": string;
}