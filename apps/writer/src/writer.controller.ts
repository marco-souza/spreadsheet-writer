import { Controller, Get } from '@nestjs/common';
import { WriterService } from './writer.service';

@Controller()
export class WriterController {
  constructor(private readonly writerService: WriterService) {}

  @Get()
  getHello(): string {
    return this.writerService.getHello();
  }
}
