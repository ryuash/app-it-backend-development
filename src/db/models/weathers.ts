import Sequelize from 'sequelize';
import { db } from '../index';

const Weathers: any = db.define('weathers', {
  data: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default Weathers;
