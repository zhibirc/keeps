/**
 * Database module.
 *
 * @author Yaroslav Surilov <zhibirc.echo@gmail.com>
 */

import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';

@Module({
    providers: [
        {
            provide: 'DATABASE_POOL',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return new Pool({
                    user:     configService.get<string>('DATABASE_USER'),
                    host:     configService.get<string>('DATABASE_HOST'),
                    database: configService.get<string>('DATABASE_NAME'),
                    password: configService.get<string>('DATABASE_PASSWORD'),
                    port:     configService.get<number>('DATABASE_PORT')
                });
            }
        },
        DatabaseService
    ],
    exports: [DatabaseService]
})
export class DatabaseModule implements OnApplicationShutdown {
    private readonly logger = new Logger(DatabaseModule.name);

    constructor(private readonly moduleRef: ModuleRef) {}

    onApplicationShutdown(signal?: string): any {
        this.logger.log(`Shutting down on signal ${signal}`);
        const pool = this.moduleRef.get('DATABASE_POOL') as Pool;
        return pool.end();
    }
}
