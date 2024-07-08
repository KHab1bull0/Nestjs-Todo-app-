import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerFunction } from './middlewares/middleware';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(loggerFunction);

  await app.listen(4000), () => {
    console.log("Server is working on port: ", 4000);
  };
}
bootstrap();

