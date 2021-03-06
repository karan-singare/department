import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Configuration for Swagger Documentation */
  const options = new DocumentBuilder()
    .setTitle('Department Management API')
    .setDescription(
      'A simple API to perform CRUD operations for entity Department',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);


  await app.listen(8001);
}
bootstrap();
