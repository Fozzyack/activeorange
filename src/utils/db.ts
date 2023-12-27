import { Pool } from 'pg'

export const pool = new Pool(
    {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_DATABASE || 'activeorange',
        password: process.env.DB_PASSWORD || '{H1deyoshi}',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
)
