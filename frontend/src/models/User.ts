export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}
export interface CreateUserRequest {
  name: string;
  role: string;
  email: string;
}


export interface UpdateUserRequest {
  name: string;
  role: string;
  email: string;
}