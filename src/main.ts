import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**crea un prefijo para los endpoints */
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      /**Tansforma la innformacion que viene por http segun los decoradores  */
      transform:true,
      transformOptions:{
        enableImplicitConversion:true
      }
    })
  )
  await app.listen(3000);
}
bootstrap();
