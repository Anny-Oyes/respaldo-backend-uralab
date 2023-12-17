import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'futureDate', async: false })
export class FutureDateValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const currentDate = new Date();
    const selectedDate = new Date(value);

    return selectedDate > currentDate;
  }

  defaultMessage(args: ValidationArguments) {
    return 'La fecha debe ser futura.';
  }
}
