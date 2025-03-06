import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileSchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    filename: string;

    @ApiProperty()
    @Expose()
    size: number;

    @ApiProperty()
    @Expose()
    mimeType: string;

    @ApiProperty()
    @Expose()
    createTime: Date;
}
