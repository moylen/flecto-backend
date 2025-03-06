import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import { apiReference } from '@scalar/nestjs-api-reference';
import { useContainer } from 'class-validator';
import { fastifyMultipart } from '@fastify/multipart';
import { ConfigHelper } from './common/domain/helpers/config.helper';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['fatal', 'error', 'warn', 'debug'],
    });

    // Config
    const configService = app.get(ConfigService);

    // Swagger
    if (ConfigHelper.normalizeBoolean(configService.get<string>('DEV_MODE'))) {
        const config = new DocumentBuilder().setTitle('Flecto API').setVersion('0.0.1').addBearerAuth().build();
        const documentFactory = () => SwaggerModule.createDocument(app, config);
        app.use('/api/docs', apiReference({ withFastify: true, spec: { content: documentFactory } }));
    }

    // Middlewares
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.register(fastifyCookie);
    await app.register(fastifyMultipart);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // Run
    await app.listen(configService.get<number>('APPLICATION_PORT') || 5000);
}

bootstrap().then();
