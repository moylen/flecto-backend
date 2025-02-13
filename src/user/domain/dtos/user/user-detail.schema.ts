import { UserSchema } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { UserContactSchema } from '../user-contact/user-contact.schema';
import { Expose, Type } from 'class-transformer';

export class UserDetailSchema extends UserSchema {
    @ApiProperty({ type: () => [UserContactSchema] })
    @Type(() => UserContactSchema)
    @Expose()
    userContacts: UserContactSchema[];
}
