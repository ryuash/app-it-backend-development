import crypto from 'crypto';
import Sequelize from 'sequelize';
import { db } from '../index';

const User: any = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return (): string => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return (): any => this.getDataValue('salt');
    },
  },
});

User.prototype.correctPassword = function (candidatePwd: string): boolean {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

User.generateSalt = function (): any {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText: string, salt: any) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

const setSaltAndPassword = (user: any) => {
  user.salt = User.generateSalt();
  user.password = User.encryptPassword(user.password(), user.salt());
};

User.beforeCreate(setSaltAndPassword);

export default User;
