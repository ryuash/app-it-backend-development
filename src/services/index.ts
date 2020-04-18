import jwt from 'jsonwebtoken';

export const generateToken = (res: any, id: number, email: string) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};

export const vertifyToken = (req: any, res: any, next: any) => {
  const token = req.headers['x-access-token'] || req.headers.authorization || '';
  try {
    if (!token.length) {
      return res.status(401).send('Unauthorized!!');
    }
    const [bearer, filteredToken] = token.split(' ');
    jwt.verify(filteredToken, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next(error);
  }
};
