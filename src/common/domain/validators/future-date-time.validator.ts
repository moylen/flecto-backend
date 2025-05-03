import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { addHours, isAfter, parseISO, subSeconds } from 'date-fns';

@Injectable()
@ValidatorConstraint({ async: true })
export class FutureDateTimeValidator implements ValidatorConstraintInterface {
    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const [minHours] = args.constraints;

        const inputDateTime = parseISO(value);
        const now = new Date();
        const minDateTime = subSeconds(addHours(now, minHours), 1);

        return isAfter(inputDateTime, minDateTime);
    }

    defaultMessage(args: ValidationArguments): string {
        const [minHours] = args.constraints;
        return `Дата должна быть больше текущей минимум на ${minHours}h`;
    }
}
