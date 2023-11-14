export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  fullname: string;
  email: string;
  password?: string;
}
