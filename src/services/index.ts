import axios from 'axios';

export const getWeather = async () => {
  try {
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=hongkong&appid=${process.env.WEATHER_APP_ID}`);
    return weather.data;
  } catch (error) {
    throw Error(error);
  }
};
