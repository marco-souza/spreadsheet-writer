import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { SpreadsheetInputDto } from '@shared/interfaces/spreadsheet.dto';
import { ClientKafka } from '@nestjs/microservices';
import { ServicesNames, WriterEvents } from '@shared/events';

const logger = new Logger(ServicesNames.API_GATEWAY);

@Controller()
export class AppController {
  constructor(@Inject(ServicesNames.WRITER) private client: ClientKafka) {}

  @Get()
  async getHello() {
    logger.log('Show hello');
    return 'Hello from Nest.js';
  }

  @Post()
  async postSpreadsheet(@Body() body: SpreadsheetInputDto) {
    logger.log('Posting process event to Kafka');
    this.client.emit(WriterEvents.PROCESS_CSV, body);
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
