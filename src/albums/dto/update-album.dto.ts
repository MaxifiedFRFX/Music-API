import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
    @ApiProperty({
        type: String,
        description: 'Nullable; The Spotify ID of the album.',
    })
    spotifyId: string;
    @ApiProperty({
        type: String,
        description: 'Non-nullable; The title of the album.',
    })
    title!: string;
    @ApiProperty({
        type: Number,
        description: 'Nullable; The artist\'s id of the album.',
    })
    artist: number;
    @ApiProperty({
        type: String,
        description: 'Nullable; The 640x640 pixel image of the album.',
    })
    image640: string;
    @ApiProperty({
        type: String,
        description: 'Nullable; The 300x300 pixel image of the album.',
    })
    image300: string;
    @ApiProperty({
        type: String,
        description: 'Nullable; The 64x64 pixel image of the album.',
    })
    image64: string;
    @ApiProperty({
        type: Date,
        description: 'Nullable; The date the album was added.',
    })
    dateAdded: Date;
    @ApiProperty({
        type: Date,
        description: 'Nullable; The date the album was released.',
    })
    dateReleased: Date;
    @ApiProperty({
        type: String,
        description: 'Nullable; The label the album was created under.',
    })
    label: string;
    @ApiProperty({
        type: Number,
        description: 'Nullable; The popularity number of the album. It is based off Spotify',
    })
    popularity: number;
    @ApiProperty({
        type: Number,
        description: 'Nullable; The duration of the album.',
    })
    duration: number;
}
