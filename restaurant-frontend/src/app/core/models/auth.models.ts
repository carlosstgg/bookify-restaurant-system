export type UserRole = 'waiter' | 'chef' | 'general_assistant' | 'manager';

export interface User {
  employee_id: number;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  employee: User;
}
