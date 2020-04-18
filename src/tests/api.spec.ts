/* eslint no-undef: "warn" */
import { expect } from 'chai';
import { db, Users } from '../db';
import app from '../index';

const appInstance = app.listen();
const request = require('supertest').agent(appInstance);

describe('api', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    await Users.create({
      email: 'user@email.com',
      password: '123',
    });
  });

  after(async () => {
    await appInstance.close();
  });

  it('POST /login', async () => {
    const res = await request
      .post('/login')
      .send({
        email: 'user@email.com',
        password: '123',
      })
      .set('Accept', 'application/json');

    expect(res.status).to.eql(200);
    expect(res.body).to.have.property('token');
  });

  it('should return 401 if i call GET /weather without bearer', async () => {
    const res = await request
      .get('/weather');

    expect(res.status).to.eql(401);
  });

  it('should return 200 weather if i call GET /weather with bearer', async () => {
    const user = await request
      .post('/login')
      .send({
        email: 'user@email.com',
        password: '123',
      })
      .set('Accept', 'application/json');

    const { token } = user.body;

    const res = await request
      .get('/weather')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.eql(200);
  });
});
