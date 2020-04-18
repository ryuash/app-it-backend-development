import express from 'express';
import cors from 'cors';

export const app: any = express();

const PORT = process.env.PORT || '8080';


app.use(cors());
app.use((req: any, res: any) => res.status(404).send('Not Found.'));

export const startServer = (): void => {
  const server = app.listen(PORT, (err: any) => {
    if (err) return console.error(err);
    return console.log(`Server is listening on ${PORT}`);
  });
};

startServer();
