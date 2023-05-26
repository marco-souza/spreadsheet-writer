import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SpreadsheetInputDto } from '@shared/shared/interfaces/spreadsheet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postSpreadsheet(@Body() body: SpreadsheetInputDto): string {
    return this.appService.postSpreadsheet(body);
  }
}
