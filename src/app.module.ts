import { join } from 'path';
import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const isProductionMode = process.env.NODE_ENV = 'production';

@Module({
  imports: [
      ConfigModule.forRoot({
          // TODO: move it to dedicated module
          validationSchema: Joi.object({
              NODE_ENV: Joi
                  .string()
                  .valid('development', 'production', 'test')
                  .required(),
              PORT: Joi
                  .number()
                  .required()
          }),
          /*validationOptions: {
              allowUnknown: !isProductionMode,
              abortEarly: true,
          },*/
          // increase performance of variables resolving
          cache: true
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          typePaths: ['./**/*.graphql'],
          definitions: {
              path: join(process.cwd(), 'src/graphql.ts'),
          },
          debug: !isProductionMode,
          playground: !isProductionMode
      }),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'client')
      })
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
