import { Controller, Logger } from '@nestjs/common';
import { SpreadsheetInputDto } from '@shared/shared/interfaces/spreadsheet.dto';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { ServicesNames, WriterEvents } from 'libs/shared/events';

const logger = new Logger(ServicesNames.WRITER);

@Controller()
export class WriterController {
  @EventPattern(WriterEvents.PROCESS_CSV)
  processCSV(
    @Payload() data: SpreadsheetInputDto,
    @Ctx() ctx: KafkaContext,
  ): string {
    logger.log(`Processing message ${ctx.getMessage()}`);
    const csv = this.parseToCSV(data);
    logger.log(`Sending CSV ${csv}`);
    // TODO: sent to spreadsheet
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
}
