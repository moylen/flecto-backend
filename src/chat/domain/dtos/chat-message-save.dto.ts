import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ChatMessageSaveDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    receiverId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    content: string;
}
