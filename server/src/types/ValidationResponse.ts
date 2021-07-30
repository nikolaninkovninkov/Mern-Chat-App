import LoginValidationError from './LoginValidationError';
import RegisterValidationError from './RegisterValidationError';

export default interface ValidationResponse {
  errors: RegisterValidationError[] | LoginValidationError[];
  valid: boolean;
}
