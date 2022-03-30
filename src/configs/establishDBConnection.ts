import { createConnection } from 'typeorm';
export async function establishDBConnection() {
    try {
        await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ['src/models/*.model.ts'],
            synchronize: true,
            ssl: true
        });
        console.log('Database connected');
    } catch (error) {
        throw new Error(error);
    }
}
