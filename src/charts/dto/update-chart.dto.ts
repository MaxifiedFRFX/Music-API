import { PartialType } from '@nestjs/mapped-types';
import { CreateChartDto } from './create-chart.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChartDto extends PartialType(CreateChartDto) {
    @ApiProperty({
        type: Number,
        description: 'Non-nullable; The User that owns the chart.',
    })
    user: number;
    @ApiProperty({
        type: String,
        description: 'Non-nullable; The title of the chart.',
    })
    title!: string;
    @ApiProperty({
        type: JSON,
        description: 'Nullable; The filters of the chart.',
    })
    filters: JSON;
    @ApiProperty({
        type: Date,
        description: 'Nullable; The date the chart was added .',
    })
    dateAdded: Date;
}
