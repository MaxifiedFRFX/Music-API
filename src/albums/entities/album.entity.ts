import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Artist } from "src/artists/entities/artist.entity";
import { CreateAlbumDto } from "../dto/create-album.dto";
import { Rating } from "src/ratings/entities/rating.entity";

@Entity()
export class Album {
    
    constructor(createAlbumDto: CreateAlbumDto) {
        this.spotifyId = createAlbumDto.spotifyId;
        this.title = createAlbumDto.title;
        this.image640 = createAlbumDto.image640;
        this.image300 = createAlbumDto.image300;
        this.image64 = createAlbumDto.image64;
        this.dateAdded = createAlbumDto.dateAdded;
        this.dateReleased = createAlbumDto.dateReleased;
        this.label = createAlbumDto.label;
        this.popularity = createAlbumDto.popularity;
        this.duration = createAlbumDto.duration;
    }

    @PrimaryKey({
        autoincrement: true
    })
    readonly id: number;

    @Property({nullable: true})
    spotifyId?: string;

    @Property({
        length: 256
    })
    title!: string;

    @ManyToOne({ onDelete: "cascade" })
    artist: Artist;

    @Property({
        length: 256,
        nullable: true
    })
    image640?: string;

    @Property({
        length: 256,
        nullable: true
    })
    image300?: string;
    
    @Property({
        length: 256,
        nullable: true
    })
    image64?: string;

    @Property({
        nullable: true
    })
    dateAdded?: Date = new Date();

    @Property({
        nullable: true
    })
    dateReleased?: Date;

    @Property({
        length: 256,
        nullable: true
    })
    label?: string;

    @Property({ 
        nullable: true 
    })
    popularity?: number;

    @Property({ 
        nullable: true 
    })
    duration?: number;

    @OneToMany(() => Rating, rating => rating.album)
    ratings?: Collection<Rating> = new Collection<Rating>(this);
}
