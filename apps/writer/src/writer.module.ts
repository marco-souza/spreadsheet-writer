import { Module } from '@nestjs/common';
import { WriterController } from './writer.controller';

@Module({
  imports: [],
  controllers: [WriterController],
  providers: [],
})
export class WriterModule {}
