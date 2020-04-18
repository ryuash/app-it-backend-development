import { Sequelize } from 'sequelize';

const databaseName = (process.env.NODE_ENV === 'test' ? 'weatherApp-test' : 'weatherApp');

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://root:password@postgres/${databaseName}`,
  {
    logging: false,
  },
);


export default db;
