import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { db } from './db';

export const app: any = express();

const PORT = process.env.PORT || '3000';

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/login', (req, res) => {

// });

app.use((req: any, res: any) => res.status(404).send('Not Found.'));

const init = async () => {
  try {
    await db.sync({ force: true });
    // await db.sync();
    console.log('db successfully winged it');
    app.listen(PORT, () => {
      console.log(`Winging it up on port ${PORT}`);
      console.log(`localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
