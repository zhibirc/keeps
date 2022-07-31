import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule/*, { abortOnError: false }*/);
    // mostly for database for now
    app.enableShutdownHooks();
    const config = app.get(ConfigService);
    await app.listen(config.get<number>('PORT'));
}

bootstrap();
