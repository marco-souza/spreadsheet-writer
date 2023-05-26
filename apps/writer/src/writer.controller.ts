import { Controller } from '@nestjs/common';
import { SpreadsheetInputDto } from '@shared/shared/interfaces/spreadsheet.dto';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { WriterEvents } from 'libs/shared/events';

@Controller()
export class WriterController {
  @EventPattern(WriterEvents.PROCESS_CSV)
  processCSV(
    @Payload() data: SpreadsheetInputDto,
    @Ctx() ctx: KafkaContext,
  ): string {
    // TODO: use kafka
    console.log(`Args: ${ctx.getArgs()}`);
    const csv = this.parseToCSV(data);
    console.log(`CSV: ${csv}`);
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
