import { Controller, Inject, Logger } from '@nestjs/common';
import { SpreadsheetInputDto } from '@shared/shared/interfaces/spreadsheet.dto';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { ServicesNames, WriterEvents } from 'libs/shared/events';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { HEADER_VALUES } from 'libs/shared/constants';

const logger = new Logger(ServicesNames.WRITER);

@Controller()
export class WriterController {
  constructor(@Inject('SPREADSHEET') private spreadsheet: GoogleSpreadsheet) {}

  @EventPattern(WriterEvents.PROCESS_CSV)
  async processCSV(
    @Payload() data: SpreadsheetInputDto,
    @Ctx() ctx: KafkaContext,
  ) {
    logger.log(`Processing message ${ctx.getMessage()}`);
    const csv = this.parseToCSV(data);

    logger.log(`Publishing Spreadsheet ${csv}`);
    await this.persistOnSpreadsheet(csv);
  }

  private async persistOnSpreadsheet(row: ParsedValue) {
    // get the first sheet or create it
    const sheet =
      this.spreadsheet.sheetCount === 0
        ? await this.spreadsheet.addSheet()
        : this.spreadsheet.sheetsByIndex[0];

    logger.log('Add Spreadsheet headers');
    await sheet.setHeaderRow(HEADER_VALUES);

    logger.log('Append a row');
    await sheet.addRow(row);
  }

  /** Returns a string like `"Data, Message, Light, Color, Internet"` */
  private parseToCSV({
    date,
    internet,
    message,
    payload,
  }: SpreadsheetInputDto): ParsedValue {
    return [date, message, payload.light, payload.color, internet];
  }
}

type ParsedValue = [string, string, number, string, boolean];
