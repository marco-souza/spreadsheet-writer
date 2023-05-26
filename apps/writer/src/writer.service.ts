import { Injectable } from '@nestjs/common';

@Injectable()
export class WriterService {
  getHello(): string {
    return 'Hello World!';
  }
}
