import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingDto {
    @ApiProperty({
        type: Number,
        description: 'Non-nullable; The chart\'s rating.',
    })
    chart!: number;
    @ApiProperty({
        type: Number,
        description: 'Non-nullable; The album that is being rated.',
    })
    album!: number;
    @ApiProperty({
        type: String,
        description: 'Nullable; The rating of the album.',
    })
    rating: string;
    @ApiProperty({
        type: Number,
        description: 'Nullable; The order within the ratings. This is if the albums have the same ratings, you can still order them inside.',
    })
    order: number;
    @ApiProperty({
        type: Date,
        description: 'Nullable; The date the rating was added.',
    })
    dateAdded: Date;
}
