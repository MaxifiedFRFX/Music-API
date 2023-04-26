import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { ChartsController } from './charts.controller';
import { UserAuthMiddleware } from 'src/middleware/UserAuth.middleware';

@Module({
    controllers: [ChartsController],
    providers: [ChartsService]
})
export class ChartsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserAuthMiddleware)
            .exclude(
                { path: 'charts', method: RequestMethod.GET }
            )
            .forRoutes(ChartsController);
    }
}
