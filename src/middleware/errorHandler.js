import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message || err.name });
  }

  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    message: isProd ? 'Simulated server error' : err.message,
  });
};
