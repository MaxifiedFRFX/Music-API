import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { UserAuthMiddleware } from 'src/middleware/UserAuth.middleware';

@Module({
    controllers: [ArtistsController],
    providers: [ArtistsService]
})
export class ArtistsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserAuthMiddleware)
            .exclude(
                { path: 'artists', method: RequestMethod.GET }
            )
            .forRoutes(ArtistsController);
    }
}
