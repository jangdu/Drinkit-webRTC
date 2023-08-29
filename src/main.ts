import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { redis } from './redis';
import { HttpExceptionFilter } from './common/exceptions/http.exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Redis
  redis.init();

  await app.listen(3000);
}
bootstrap();
