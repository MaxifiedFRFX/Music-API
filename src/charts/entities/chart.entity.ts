import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { CreateChartDto } from "../dto/create-chart.dto";
import { Rating } from "src/ratings/entities/rating.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Chart {
    constructor(createChartDto: CreateChartDto) {
        this.title = createChartDto.title;
        this.filters = createChartDto.filters;
        this.dateAdded = createChartDto.dateAdded;
    }
    
    @PrimaryKey({
        autoincrement: true
    })
    readonly id: number;
        
    @ManyToOne()
    user!: User;

    @Property({
        length: 256,
        nullable: true
    })
    title!: string;

    @Property({
        nullable: true
    })
    filters: JSON;

    @Property({
        nullable: true
    })
    dateAdded: Date = new Date();

    @Property({
        nullable: true,
        onUpdate: () => new Date()
    })
    dateUpdated: Date = new Date();

    @OneToMany(() => Rating, rating => rating.chart, { cascade: [Cascade.REMOVE] })
    rating: Collection<Rating> = new Collection<Rating>(this);
}
