import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { WriterModule } from './writer.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WriterModule,
    {
      transport: Transport.TCP, // TODO: kafka
    },
  );
  await app.listen();
}
bootstrap();
