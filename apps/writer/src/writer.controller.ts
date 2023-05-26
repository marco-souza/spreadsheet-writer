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

const logger = new Logger(ServicesNames.WRITER);

@Controller()
export class WriterController {
  constructor(@Inject('SPREADSHEET') private spreadsheet: GoogleSpreadsheet) {}

  @EventPattern(WriterEvents.PROCESS_CSV)
  processCSV(
    @Payload() data: SpreadsheetInputDto,
    @Ctx() ctx: KafkaContext,
  ): string {
    logger.log(`Processing message ${ctx.getMessage()}`);
    const csv = this.parseToCSV(data);

    logger.log(`Publishing Spreadsheet ${csv}`);
    this.persistOnSpreadsheet(csv);

    return csv;
  }

  private persistOnSpreadsheet(csv: string) {
    const sheet = this.spreadsheet.sheetsByIndex[0]; // FIXME: check if exists, if not create
    const rows = sheet.getRows();
    logger.log({ rows, csv });
    // TODO: continue
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
}
