import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServicesNames } from 'libs/shared/events';

@Module({
  imports: [
    ClientsModule.register([
      { name: ServicesNames.WRITER, transport: Transport.TCP },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
