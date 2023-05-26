import { Test, TestingModule } from '@nestjs/testing';
import { WriterController } from './writer.controller';
import { VALID_INPUT } from '@shared/constants';
import { KafkaContext } from '@nestjs/microservices';

describe('WriterController', () => {
  let writerController: WriterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WriterController],
      providers: [],
    }).compile();

    writerController = app.get<WriterController>(WriterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(writerController.processCSV(VALID_INPUT, {} as KafkaContext)).toBe(
        'Hello World!',
      );
    });
  });
});
