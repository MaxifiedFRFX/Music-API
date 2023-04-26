import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Loaded } from '@mikro-orm/core';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly em: EntityManager,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User(createUserDto);

        await this.em.persistAndFlush(user)
        return user;
    }

    async findAll(): Promise<Loaded<User[]>> {
        return this.em.find(User, {});
    }

    findOne(id: number) {
        return this.em.findOne(User, { id: id });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.em.findOneOrFail(User, id);

        this.em.assign(user, updateUserDto);

        await this.em.persistAndFlush(user);

        return user;
    }

    async remove(id: number) {
        const user = this.em.getReference(User, id);
        await this.em.remove(user).flush();

        return this.em.find(User, {});
    }
}
