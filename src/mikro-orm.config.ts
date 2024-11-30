import { defineConfig } from '@mikro-orm/postgresql';
import { config } from 'dotenv';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
config();

export default defineConfig({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  driver: PostgreSqlDriver,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
});
