import { ApiProperty } from '@nestjs/swagger';

export class FileSaveDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
