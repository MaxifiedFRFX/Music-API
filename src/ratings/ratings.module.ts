import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { UserAuthMiddleware } from 'src/middleware/UserAuth.middleware';

@Module({
    controllers: [RatingsController],
    providers: [RatingsService]
})
export class RatingsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserAuthMiddleware)
            .exclude(
                { path: 'ratings', method: RequestMethod.GET }
            )
            .forRoutes(RatingsController);
    }
}
