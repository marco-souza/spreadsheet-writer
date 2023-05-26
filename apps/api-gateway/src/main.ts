import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  // TODO: add microservice to handle kafka messages
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(`Listening on http://localhost:${port}`);
}
bootstrap();
