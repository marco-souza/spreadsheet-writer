import { Module } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { WriterController } from './writer.controller';
import { SpreadsheetService } from './spreadsheet.service';

const GoogleSpreadsheetProvider = {
  provide: 'SPREADSHEET',
  useFactory: async () => {
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_PRIVATE_SPREADSHEET_ID,
    );
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo();
    return doc;
  },
};

@Module({
  controllers: [WriterController],
  providers: [SpreadsheetService, GoogleSpreadsheetProvider],
})
export class WriterModule {}
