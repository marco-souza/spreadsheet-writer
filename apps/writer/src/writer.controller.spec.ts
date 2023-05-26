import { Test, TestingModule } from '@nestjs/testing';
import { WriterController } from './writer.controller';
import { WriterService } from './writer.service';

describe('WriterController', () => {
  let writerController: WriterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WriterController],
      providers: [WriterService],
    }).compile();

    writerController = app.get<WriterController>(WriterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(writerController.getHello()).toBe('Hello World!');
    });
  });
});
