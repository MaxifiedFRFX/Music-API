import { Cascade, Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Album } from "src/albums/entities/album.entity";
import { Chart } from "src/charts/entities/chart.entity";
import { CreateRatingDto } from "../dto/create-rating.dto";

@Entity()
export class Rating {
    constructor(createRatingDto: CreateRatingDto) {
        this.rating = createRatingDto.rating;
        this.order = createRatingDto.order;
        this.dateAdded = createRatingDto.dateAdded;
    }

    @ManyToOne(() => Chart, { primary: true, cascade: [Cascade.REMOVE] })
    chart!: Chart;

    @ManyToOne(() => Album, { primary: true })
    album!: Album;

    @Property({
        length: 255,
        nullable: true
    })
    rating: string;

    @Property({
        nullable: true
    })
    order: number;

    @Property({
        nullable: true
    })
    dateAdded: Date = new Date();

    @Property({
        nullable: true,
        onUpdate: () => new Date()
    })
    dateUpdated: Date = new Date();
}
