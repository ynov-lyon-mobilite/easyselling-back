import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

import { ImportService } from './services/import.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const importService = app.get<ImportService>(ImportService);
  await importService.import();
  await app.close();
}
bootstrap();
