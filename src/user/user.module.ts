import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './services/user/user.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // applyies to all routes
        // consumer.apply(AuthMiddleware).forRoutes('user');           // code below works the same
        // consumer.apply(AuthMiddleware).forRoutes(UserController);   // using User controller

        // Explicit application
        consumer
            // .apply(AuthMiddleware).forRoutes(
                // {
                //     path: 'user',                       // specific path
                //     method: RequestMethod.GET,          // http method used
                // },
                // {
                //     path: 'user/sort',                  // specific path
                //     method: RequestMethod.GET,          // http method used
                // },

            // )
            .apply(LoggingMiddleware).forRoutes('*')
    }
}
