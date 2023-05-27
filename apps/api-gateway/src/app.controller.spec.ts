import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ServicesNames, WriterEvents } from '@shared/events';
import { VALID_INPUT } from '@shared/constants';
import { ClientKafka } from '@nestjs/microservices';

describe('AppController', () => {
  let appController: AppController;
  let client: ClientKafka;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ServicesNames.WRITER,
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    client = app.get<ClientKafka>(ServicesNames.WRITER);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const output = await appController.getHello();
      expect(output).toContain('Nest.js');
    });

    it('if valid, should emit event to process input', async () => {
      await appController.postSpreadsheet(VALID_INPUT);
      expect(client.emit).toBeCalledWith(WriterEvents.PROCESS_CSV, VALID_INPUT);
    });
  });
});
