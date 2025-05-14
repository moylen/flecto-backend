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
    app.enableCors({
        origin: ['http://localhost:5173', configService.get<string>('ORIGIN')],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    // Swagger
    if (ConfigHelper.normalizeBoolean(configService.get<string>('DEV_MODE'))) {
        const config = new DocumentBuilder().setTitle('Flecto API').setVersion('0.0.1').addBearerAuth().build();
        const document = SwaggerModule.createDocument(app, config);
        app.use('/api/docs', apiReference({ withFastify: true, spec: { content: document } }));
    }

    // Middlewares
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.register(fastifyCookie);
    await app.register(fastifyMultipart, {
        limits: {
            fileSize: 5 * 1024 * 1024,
            files: 10,
        },
    });
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // Run
    const port = configService.get<string>('APPLICATION_PORT');
    await app.listen(port, '0.0.0.0');
    console.info(`Docs on http://localhost:${port}/api/docs`);
}

bootstrap().then();
