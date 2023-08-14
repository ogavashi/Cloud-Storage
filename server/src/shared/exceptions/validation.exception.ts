import { BadRequestException, ValidationError } from '@nestjs/common';

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const formatError = (errors: ValidationError[]) => {
    const errMsg = {};
    errors.forEach((error: ValidationError) => {
      errMsg[error.property] = error.children.length
        ? [formatError(error.children)]
        : [...Object.values(error.constraints)];
    });
    return errMsg;
  };

  return new ValidationException(formatError(errors));
};
export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Record<string, unknown>) {
    super(validationErrors);
  }
}
