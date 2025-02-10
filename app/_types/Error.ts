export interface ErrorResponse {
  type: string | 'unknown';
  message: string;
}
export interface ApiErrorResponse {
  errors: ErrorResponse[];
}
