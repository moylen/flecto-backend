import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['fatal', 'error', 'warn', 'debug'],
    });

    // Config
    const configService = app.get(ConfigService);

    // Middlewares
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.register(fastifyCookie);

    // Swagger
    const config = new DocumentBuilder().setTitle('Flecto API').setVersion('0.0.1').addBearerAuth().build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);

    // Run
    await app.listen(configService.get<number>('APPLICATION_PORT') || 5000);
}

bootstrap().then();
