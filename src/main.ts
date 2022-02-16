import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

import config from './configs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SWQ API Documentation')
    .setDescription('')
    .setVersion('1.0')
    .addSecurity('Bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  await app.listen(config.port);
}
bootstrap();
