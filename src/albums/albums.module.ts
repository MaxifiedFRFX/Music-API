import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { UserAuthMiddleware } from 'src/middleware/UserAuth.middleware';

@Module({
    controllers: [AlbumsController],
    providers: [AlbumsService]
})
export class AlbumsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserAuthMiddleware)
            .exclude(
                { path: 'albums', method: RequestMethod.GET }
            )
            .forRoutes(AlbumsController);
    }
}
