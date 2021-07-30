export default interface LoginValidationError {
  message: string;
  type: 'username' | 'password';
}
