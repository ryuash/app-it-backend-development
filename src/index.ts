import express from 'express';
import axios from 'axios';
import cors from 'cors';
import morgan from 'morgan';
import { db, Weathers } from './db';

export const app: any = express();

const PORT = process.env.PORT || '3000';

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/weather', async (req: any, res: any, next: any) => {
  try {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=hongkong&appid=${process.env.WEATHER_APP_ID}`);
    await Weathers.create({
      data: JSON.stringify(weather.data),
    });
    res.json(weather.data);
  } catch (error) {
    const errorMessage = `Error Message: ${error.message || 'Internal server error'}`;
    res.status(error.status || 500).send(errorMessage);
  }
});

app.use((req: any, res: any) => res.status(404).send('Not Found.'));

const init = async () => {
  try {
    await db.sync({ force: true });
    // await db.sync();
    console.log('db successfully synced');
    app.listen(PORT, () => {
      console.log(`Winging it up on port ${PORT}`);
      console.log(`localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
