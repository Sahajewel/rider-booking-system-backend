export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role?: string; 
}
export interface LoginPayload {
  email: string;
  password: string;
}