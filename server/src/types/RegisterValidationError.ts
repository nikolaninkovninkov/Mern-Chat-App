export default interface RegisterValidationError {
  message: string;
  type: 'email' | 'password' | 'username' | 'name';
}
