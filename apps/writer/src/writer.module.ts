import { Module } from '@nestjs/common';
import { WriterController } from './writer.controller';
import { WriterService } from './writer.service';

@Module({
  imports: [],
  controllers: [WriterController],
  providers: [WriterService],
})
export class WriterModule {}
