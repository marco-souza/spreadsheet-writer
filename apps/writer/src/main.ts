import { NestFactory } from '@nestjs/core';
import { WriterModule } from './writer.module';

async function bootstrap() {
  const app = await NestFactory.create(WriterModule);
  await app.listen(3000);
}
bootstrap();
