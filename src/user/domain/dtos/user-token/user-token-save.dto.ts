import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserTokenSaveDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    refreshToken: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    expireTime: Date;
}
