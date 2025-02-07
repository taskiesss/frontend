export interface ErrorResponse {
  type: 'username' | 'email' | 'password' | 'unknown';
  message: string;
}
export interface ApiErrorResponse {
  errors: ErrorResponse[];
}
