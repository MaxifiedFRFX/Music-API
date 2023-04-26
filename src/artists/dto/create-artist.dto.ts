import { ApiProperty } from "@nestjs/swagger";

export class CreateArtistDto {
    @ApiProperty({
        type: String,
        description: 'Nullable; The Spotify ID of the artist.',
    })
    spotifyId: string;
    @ApiProperty({
        type: String,
        description: 'Non-nullable; The name of the artist.',
    })
    name!: string;
    @ApiProperty({
        type: String,
        description: 'Nullable; The 640x640 pixel image of the artist.',
    })
    image640: string;
    @ApiProperty({
        type: String,
        description: 'Nullable; The 300x300 pixel image of the artist.',
    })
    image300: string;
    @ApiProperty({
        type: String,
        description: 'Nullable; The 64x64 pixel image of the artist.',
    })
    image64: string;
    @ApiProperty({
        type: Date,
        description: 'Nullable; The date the artist was added.',
    })
    dateAdded: Date;
    @ApiProperty({
        type: Number,
        description: 'Nullable; The popularity number of the artist. It is based off Spotify',
    })
    popularity: number;
}
