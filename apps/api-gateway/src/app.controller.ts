import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SpreadsheetInputDto } from '@shared/shared/interfaces/spreadsheet.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ServicesNames, WriterEvents } from 'libs/shared/events';

@Controller()
export class AppController {
  constructor(@Inject(ServicesNames.WRITER) private client: ClientProxy) {}

  @Get()
  async getHello() {
    return 'Hello from Nest.js';
  }

  @Post()
  async postSpreadsheet(@Body() body: SpreadsheetInputDto) {
    this.client.emit(WriterEvents.PROCESS_CSV, body);
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
