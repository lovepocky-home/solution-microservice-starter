import { Controller, Get, Logger } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Paged } from './common/page';

@Controller()
@ApiExtraModels(Paged)
export class AppController {

  private logger = new Logger(AppController.name)

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return { hello: this.appService.getHello() };
  }

}
