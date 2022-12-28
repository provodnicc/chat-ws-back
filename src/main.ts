import { Logger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(NestApplication.name)
  const PORT = 9009

  await app.listen(PORT, ()=>logger.verbose('start on port '+ PORT));
}
bootstrap();
