import { db, Users } from '../db/index';

const user = {
  email: 'weather@email.com',
  password: '123',
};

const runSeed = async (): Promise<any> => {
  try {
    console.log('seeding in progress');
    await db.sync({ force: true });
    console.log('db connected');
    await Users.create(user);
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
};

runSeed();

export default runSeed;
