import { Controller } from '@nestjs/common';
import { SpreadsheetInputDto } from '@shared/interfaces/spreadsheet.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { WriterEvents } from '@shared/events';
import { SpreadsheetService } from './spreadsheet.service';

@Controller()
export class WriterController {
  constructor(private readonly spreadsheetService: SpreadsheetService) {}

  @EventPattern(WriterEvents.PROCESS_CSV)
  async processCSV(@Payload() data: SpreadsheetInputDto) {
    await this.spreadsheetService.addRow(data);
  }
}
