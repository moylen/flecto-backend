import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserContactSchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty()
    @Expose()
    link: string;
}
