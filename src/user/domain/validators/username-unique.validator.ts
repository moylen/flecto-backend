import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UsernameUniqueValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(value: string): Promise<boolean> {
        const duplicate = await this.userService.findByUsername(value);
        return !duplicate;
    }

    defaultMessage(): string {
        return 'Данное имя пользователя уже используется';
    }
}
