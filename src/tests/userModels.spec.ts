/* eslint no-undef: "warn" */
import { expect } from 'chai';
import { db, Users } from '../db';

let user: any = null;

describe('User model', () => {
  beforeEach(() => db.sync({ force: true }));

  after(async (done: any) => {
    db.close();
    done();
  });

  describe('create', () => {
    beforeEach(async () => {
      user = await Users.create({
        email: 'user@email.com',
        password: '123',
      });
    });

    it('returns true if password is correct', () => {
      expect(user.correctPassword('123')).to.be.eql(true);
    });

    it('returns false if password is incorrect', () => {
      expect(user.correctPassword('1234')).to.be.eql(false);
    });

    it('expects password to be hashed', () => {
      const { dataValues } = user;
      expect(dataValues.password).to.not.eql('123');
    });
  });
});
