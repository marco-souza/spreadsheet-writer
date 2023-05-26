import { Module } from '@nestjs/common';
import { WriterController } from './writer.controller';
import { GoogleSpreadsheet } from 'google-spreadsheet';

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
    await doc.loadInfo(); // loads sheets
    return doc;
  },
};

@Module({
  imports: [],
  controllers: [WriterController],
  providers: [GoogleSpreadsheetProvider],
})
export class WriterModule {}
