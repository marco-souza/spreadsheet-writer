import { Test, TestingModule } from '@nestjs/testing';
import { WriterController } from './writer.controller';
import { VALID_INPUT } from '@shared/constants';
import { SpreadsheetService } from './spreadsheet.service';

describe('WriterController', () => {
  let writerController: WriterController;
  let spreadsheetService: SpreadsheetService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WriterController],
      providers: [
        {
          provide: SpreadsheetService,
          useValue: { addRow: jest.fn() },
        },
      ],
    }).compile();

    writerController = app.get<WriterController>(WriterController);
    spreadsheetService = app.get<SpreadsheetService>(SpreadsheetService);
  });

  describe('root', () => {
    it('should return a list of values', () => {
      writerController.processCSV(VALID_INPUT);
      expect(spreadsheetService.addRow).toHaveBeenCalledWith(VALID_INPUT);
    });
  });
});
