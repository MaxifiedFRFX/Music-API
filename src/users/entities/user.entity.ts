import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Chart } from "src/charts/entities/chart.entity";
import { v4 as uuid } from "uuid";
import { CreateUserDto } from "../dto/create-user.dto";

@Entity()
export class User {
    constructor(createUserTdo: CreateUserDto) {
        this.username = createUserTdo.username;
    }

    @PrimaryKey({
        autoincrement: true
    })
    readonly id: number;

    @Property({
        nullable: true
    })
    APIKey: string = uuid();

    @Property({
        length: 32,
        nullable: true
    })
    username!: string

    @OneToMany(() => Chart, chart => chart.user)
    charts: Collection<Chart> = new Collection<Chart>(this);
}
