import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TagSchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    title: string;
}
