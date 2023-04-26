import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserAuthMiddleware } from 'src/middleware/UserAuth.middleware';

@Module({
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserAuthMiddleware)
            .exclude(
                { path: 'users', method: RequestMethod.GET },
                { path: 'users', method: RequestMethod.POST }
            )
            .forRoutes(UsersController);
    }
}
