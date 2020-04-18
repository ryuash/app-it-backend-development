import express from 'express';
import axios from 'axios';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {
  db,
  Weathers,
  Users,
} from './db';
import {
  generateToken,
  vertifyToken,
} from './services';

const app: any = express();

const PORT = process.env.PORT || '3000';

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).send('Unauthorized!!');
    } else if (!user.correctPassword(password)) {
      res.status(401).send('Incorrect email/password');
    } else {
      const { id } = user;
      const token = await generateToken(res, id, email);
      res.send({
        token,
      });
    }
  } catch (error) {
    next(error);
  }
});

app.get('/weather', vertifyToken, async (req: any, res: any, next: any) => {
  try {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=hongkong&appid=${process.env.WEATHER_APP_ID}`);
    await Weathers.create({
      data: JSON.stringify(weather.data),
    });
    res.json(weather.data);
  } catch (error) {
    const [cachedWeather] = await Weathers.findAll({
      raw: true,
      limit: 1,
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    res.json(JSON.parse(cachedWeather.data));
  }
});

app.use((req: any, res: any) => {
  res.status(404).send('not found');
});

app.use((error: any, req: any, res: any, next: any) => {
  const errorMessage = `Error Message: ${error.message || 'Internal server error'}`;
  res.status(error.status || 500).json(errorMessage);
});

const init = async () => {
  try {
    await db.sync();
    console.log('db successfully synced');
    if (!module.parent) {
      app.listen(PORT, () => {
        console.log(`Winging it up on port ${PORT}`);
        console.log(`localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

init();

export default app;
