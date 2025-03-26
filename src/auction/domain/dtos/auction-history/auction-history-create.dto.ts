import { AuctionAction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AuctionHistoryCreateDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    auctionId: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    userId?: number;

    @ApiProperty({ enum: AuctionAction })
    @IsNotEmpty()
    action: AuctionAction;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isSystem: boolean;
}
