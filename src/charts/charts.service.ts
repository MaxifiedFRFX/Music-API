import { Injectable } from '@nestjs/common';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Chart } from './entities/chart.entity';
import { Loaded } from '@mikro-orm/core';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChartsService {
    constructor(
        private readonly em: EntityManager,
    ) { }

    async create(createChartDto: CreateChartDto): Promise<Chart> {
        const chart = new Chart(createChartDto);

        chart.user = await this.em.findOneOrFail(User, { id: createChartDto.user });

        await this.em.persistAndFlush(chart)
        return chart;
    }

    async findAll(): Promise<Loaded<Chart[]>> {
        return this.em.find(Chart, {});
    }

    findOne(id: number) {
        return this.em.findOne(Chart, { id: id });
    }

    async update(id: number, updateChartDto: UpdateChartDto): Promise<Chart> {
        const chart = await this.em.findOneOrFail(Chart, id);

        chart.user = await this.em.findOneOrFail(User, { id: updateChartDto.user });

        this.em.assign(chart, updateChartDto);

        await this.em.persistAndFlush(chart);

        return chart;
    }

    async remove(id: number) {
        const chart = this.em.getReference(Chart, id);
        await this.em.remove(chart).flush();

        return this.em.find(Chart, {});
    }
}
