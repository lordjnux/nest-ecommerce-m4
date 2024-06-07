import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LogEndpointInterceptor } from './interceptors/log-endpoint.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LogEndpointInterceptor());

  const categoriesSeeder = app.get(CategoriesService);
  await categoriesSeeder.seedCategories();

  const productSeeder = app.get(ProductsService);
  await productSeeder.seedProducts();

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ecommerce-lordjnux')
    .setDescription(
      'API construida con Nest como proyecto para el módulo 4 de la especialidad Backend de la carrera Fullstack en SoyHenry',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
