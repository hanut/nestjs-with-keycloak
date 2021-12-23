import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Crypto Api')
    .setDescription('A simple api to work with a crypto currency list')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorer', app, document);

  const appService = app.get(AppService);
  appService.add({ name: 'Bitcoin', price: 148000 });
  appService.add({ name: 'Litecoin', price: 30000 });
  appService.add({ name: 'FireCoin', price: 15000 });
  appService.add({ name: 'Ethereum', price: 99999 });

  await app.listen(3000);
}
bootstrap();
