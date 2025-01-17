import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mundo! mi broooo';
  }

  postHello(): string {
    return 'Hola, desde @Post en el service!';
  }
}
