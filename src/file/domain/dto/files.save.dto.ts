import { ApiProperty } from '@nestjs/swagger';

export class FilesSaveDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
}
