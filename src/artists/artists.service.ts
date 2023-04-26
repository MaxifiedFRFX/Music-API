import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Artist } from './entities/artist.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class ArtistsService {
    constructor(
        private readonly em: EntityManager,
    ) { }

    async create(createArtistDto: CreateArtistDto): Promise<Artist> {
        const artist = new Artist(createArtistDto);

        await this.em.persistAndFlush(artist)
        return artist;
    }

    async findAll(): Promise<Loaded<Artist[]>> {
        return this.em.find(Artist, {});
    }

    findOne(id: number) {
        return this.em.findOne(Artist, { id: id });
    }

    async update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist> {
        const artist = await this.em.findOneOrFail(Artist, id);

        this.em.assign(artist, updateArtistDto);

        await this.em.persistAndFlush(artist);

        return artist;
    }

    async remove(id: number) {
        const artist = this.em.getReference(Artist, id);
        await this.em.remove(artist).flush();

        return this.em.find(Artist, {});
    }
}
