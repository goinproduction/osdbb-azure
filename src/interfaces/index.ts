export interface ISignUp {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface IHTTP_STATUS extends Object {
  code: number;
  status: string;
}

export interface IDataResponse {
  message?: string;
  success?: boolean;
  data?: object;
}
