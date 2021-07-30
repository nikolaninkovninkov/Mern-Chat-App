import LoginValidationError from './LoginValidationError';
import RegisterValidationError from './RegisterValidationError';

export default interface ServerClientError {
  message: string;
  errors?: LoginValidationError[] | RegisterValidationError[];
}
