/**
 * Database Service module.
 *
 * @author Yaroslav Surilov <zhibirc.echo@gmail.com>
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import errorCodes from './error.codes';

// TODO: move interfaces in a separate directory
export interface IDatabaseService {
    query: (sqlText: string, params: unknown[]) => Promise<any>
}

@Injectable()
export class DatabaseService implements IDatabaseService {
    private readonly logger = new Logger(DatabaseService.name);

    constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

    async query ( sqlText: string, params ) {
        try {
            const start = Date.now();
            const result = await this.pool.query(sqlText, params);

            this.logger.log(`Request "${sqlText}" completed in ${Date.now() - start}ms.`);

            return result;
        } catch ( exception ) {
            const error = errorCodes[exception.code];

            error && this.logger.error(`General error: ${error}.`);
            // this.logger.error(exception);

            throw exception;
        }
    }
}
