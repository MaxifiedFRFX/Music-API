import { Request, Response, NextFunction } from "express";
import HttpException from "src/HttpException.error";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { EntityManager, MikroORM, RequestContext } from "@mikro-orm/core";
import { User } from "src/users/entities/user.entity";
import mikroConfig from "../../mikro-orm.config";


@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
    async use(request: Request, response: Response, next: NextFunction) {
        const apiKey = request.header("api_key");

        if (!apiKey) {
            return next(new HttpException("Forbidden", 403));
        }

        const orm = await MikroORM.init(mikroConfig);
        RequestContext.create(orm.em, next);
        const user = await orm.em.findOne(User, { APIKey: apiKey });

        if (user) {
            return next();
        } else {
            return next(new HttpException("Forbidden", 403));
        }
    }
}
