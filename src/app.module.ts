import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const isDevelopMode = process.env.DEVELOP === 'true';

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'client')
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          typePaths: ['./**/*.graphql'],
          definitions: {
              path: join(process.cwd(), 'src/graphql.ts'),
          },
          debug: isDevelopMode,
          playground: isDevelopMode
      })
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
