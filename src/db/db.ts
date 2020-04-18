import { Sequelize } from 'sequelize';

const databaseName = (process.env.NODE_ENV === 'test' ? 'weather_app_test' : 'weather_app');

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres/${databaseName}`,
  {
    logging: false,
  },
);


export default db;
