import { Injectable, Logger } from '@nestjs/common';
import { SpreadsheetInputDto } from '@shared/shared/interfaces/spreadsheet.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postSpreadsheet(spreadsheetInput: SpreadsheetInputDto): string {
    const csv = this.parseToCSV(spreadsheetInput);
    this.publishMessageToProcess(csv);
    return csv;
  }

  /** Returns a string like `"Data, Message, Light, Color, Internet"` */
  private parseToCSV({
    date,
    internet,
    message,
    payload,
  }: SpreadsheetInputDto) {
    return [date, message, payload.light, payload.color, internet].join(',');
  }

  private publishMessageToProcess(msg: string) {
    Logger.log(msg);
    // TODO: publish message to kafka
  }
}
