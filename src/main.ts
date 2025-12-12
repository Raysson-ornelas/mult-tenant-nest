import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConsoleLogger } from '@nestjs/common';
import { setupApp } from './utils/setup-app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    logger: new ConsoleLogger({
      prefix:
        process.env.NODE_ENV !== 'production' ? 'WEB-API-PROCESSOR' : undefined,
      compact: false,
      json: process.env.NODE_ENV === 'production',
      timestamp: process.env.NODE_ENV !== 'production',
    }),
  });
  setupApp(app);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
