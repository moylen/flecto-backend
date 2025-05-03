import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber, Min, Validate } from 'class-validator';
import { FutureDateTimeValidator } from '../../../../common/domain/validators/future-date-time.validator';

export class AuctionCreateDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    articleId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    startPrice: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    stepPrice: number;

    @ApiProperty()
    @IsISO8601()
    @IsNotEmpty()
    @Validate(FutureDateTimeValidator, [24])
    untilTime: Date;
}
