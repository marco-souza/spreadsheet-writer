import { Inject, Injectable, Logger } from '@nestjs/common';
import { SpreadsheetInputDto } from '@shared/interfaces/spreadsheet.dto';
import { ServicesNames } from '@shared/events';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { HEADER_VALUES } from '@shared/constants';

const logger = new Logger(ServicesNames.WRITER);

type ParsedValue = [string, string, number, string, boolean];

@Injectable()
export class SpreadsheetService {
  constructor(@Inject('SPREADSHEET') private spreadsheet: GoogleSpreadsheet) {}

  async addRow(data: SpreadsheetInputDto) {
    logger.log('Processing message');
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
