import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { EntityManager, Loaded } from '@mikro-orm/core';
import { Chart } from 'src/charts/entities/chart.entity';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class RatingsService {
    constructor(
        private readonly em: EntityManager,
    ) { }
    
    async create(createRatingDto: CreateRatingDto): Promise<Rating> {
        const rating = new Rating(createRatingDto);

        rating.chart = await this.em.findOneOrFail(Chart, { id: createRatingDto.chart });
        rating.album = await this.em.findOneOrFail(Album, { id: createRatingDto.album });

        await this.em.persistAndFlush(rating)
        return rating;
    }

    async findAll(): Promise<Loaded<Rating[]>> {
        return this.em.find(Rating, {});
    }

    findOne(chart_id: number, album_id: number) {
        return this.em.findOne(Rating, { chart: chart_id, album: album_id });
    }

    async update(chart_id: number, album_id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
        const rating = await this.em.findOneOrFail(Rating,  { chart: chart_id, album: album_id });

        this.em.assign(rating, updateRatingDto);

        await this.em.persistAndFlush(rating);

        return rating;
    }

    async remove(chart_id: number, album_id: number) {
        const rating = await this.em.findOneOrFail(Rating, { chart: chart_id, album: album_id });
        await this.em.remove(rating).flush();

        return this.em.find(Rating, {});
    }
}
