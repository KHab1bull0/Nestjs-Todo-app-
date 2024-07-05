import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware, loggerFunction, userMiddleware } from './middlewares/middleware';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './schemas/log.schema';
import { LoggerMiddleware } from './middlewares/log.middleware';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './errorhandling.ts/errorhandling';



@Module({
  imports: [AuthModule, UserModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('*');
    // consumer.apply(AuthMiddleware).exclude('auth').forRoutes('*');
    // consumer.apply(AuthMiddleware, loggerFunction).forRoutes("*");
    consumer.apply(userMiddleware).forRoutes({ method: RequestMethod.GET, path: 'user' });
    consumer.apply(LoggerMiddleware).forRoutes('*');

  }

}






