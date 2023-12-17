import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'timeOrder', async: false })
export class TimeOrderValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const startTime = args.object[args.constraints[0]];
    const endTime = value;

    // Verifica que startTime y endTime estén definidos y sean cadenas de caracteres
    if (typeof startTime !== 'string' || typeof endTime !== 'string') {
      return false;
    }

    // Verifica que startTime y endTime tengan el formato "HH:MM"
    if (
      !/^([01]\d|2[0-3]):([0-5]\d)$/.test(startTime) ||
      !/^([01]\d|2[0-3]):([0-5]\d)$/.test(endTime)
    ) {
      return false;
    }

    return startTime < endTime;
  }

  defaultMessage(args: ValidationArguments) {
    return 'La hora de inicio debe ser anterior a la hora de fin.';
  }
}
