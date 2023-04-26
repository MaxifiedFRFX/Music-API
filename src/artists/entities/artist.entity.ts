import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Album } from "src/albums/entities/album.entity";
import { CreateArtistDto } from "../dto/create-artist.dto";

@Entity()
export class Artist {
    constructor(createArtistDto: CreateArtistDto) {
        this.spotifyId = createArtistDto.spotifyId;
        this.name = createArtistDto.name;
        this.image640 = createArtistDto.image640;
        this.image300 = createArtistDto.image300;
        this.image64 = createArtistDto.image64;
        this.dateAdded = createArtistDto.dateAdded;
        this.popularity = createArtistDto.popularity;
    }

    @PrimaryKey({
        autoincrement: true
    })
    readonly id: number; 

    @Property({
        nullable: true
    })
    spotifyId?: string;

    @Property({
        length: 256
    })
    name!: string;

    @Property({
        length: 256,
        nullable: true
    })
    image640: string;

    @Property({
        length: 256,
        nullable: true
    })
    image300: string;
    
    @Property({
        length: 256,
        nullable: true
    })
    image64: string;

    @Property({
        nullable: true
    })
    dateAdded: Date = new Date();

    @Property({
        nullable: true
    })
    popularity: number;

    @OneToMany(() => Album, album => album.artist, { cascade: [Cascade.REMOVE] })
    albums = new Collection<Album>(this);
}
