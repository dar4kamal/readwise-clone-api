import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { UniversalExceptionFilter } from './utilities/universal.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new UniversalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Readwise-clone API')
    .setDescription('Readwise-clone API Documentation')
    .setVersion('1.0')
    .addBasicAuth(
      { type: 'apiKey', in: 'header', name: 'x-auth-token' },
      'x-auth-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
