import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// PARA EVITAR PROBLEMAS DE RAILWAY
if (!(global as any).crypto) {
  (global as any).crypto = require('crypto');
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
