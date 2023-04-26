import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Album } from './entities/album.entity';
import { Loaded, wrap } from '@mikro-orm/core';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class AlbumsService {
    constructor(
        private readonly em: EntityManager,
    ) { }

    async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
        const album = new Album(createAlbumDto);

        album.artist = await this.em.findOneOrFail(Artist, { id: createAlbumDto.artist });

        await this.em.persistAndFlush(album)
        return album;
    }

    async findAll(): Promise<Loaded<Album[]>> {
        return this.em.find(Album, {});
    }

    findOne(id: number) {
        return this.em.findOne(Album, { id: id });
    }

    async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        const album = await this.em.findOneOrFail(Album, id);

        album.artist = await this.em.findOneOrFail(Artist, { id: updateAlbumDto.artist });

        this.em.assign(album, updateAlbumDto);

        await this.em.persistAndFlush(album);

        return album;
    }

    async remove(id: number) {
        const album = this.em.getReference(Album, id);
        await this.em.remove(album).flush();

        return this.em.find(Album, {});
    }
}
