import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://root:password@postgres/weatherApp',
  {
    logging: false,
  },
);


export default db;
