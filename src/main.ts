import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    // Middlewares
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    // Swagger
    const config = new DocumentBuilder().setTitle('Flecto API').setVersion('0.0.1').addBearerAuth().build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);

    // Run
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
