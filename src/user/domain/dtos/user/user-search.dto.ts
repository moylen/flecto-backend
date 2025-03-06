import { PaginationDto } from '../../../../common/domain/dtos/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSearchDto extends PaginationDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    username?: string;
}
