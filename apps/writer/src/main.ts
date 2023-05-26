import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { WriterModule } from './writer.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WriterModule,
    {
      transport: Transport.TCP, // TODO: kafka
      options: { host: '0.0.0.0' },
    },
  );
  await app.listen();
}
bootstrap();
