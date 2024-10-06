import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  } 

  @Get('hello')
  getHelloMessage(): string {
    return this.appService.getHelloMessage();
  }

  @Get('hello/:name')
  getHelloMessages(@Param('name') name: string): string {
    return this.appService.getHelloMessages(name);
  }
}
