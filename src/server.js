import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';
import { errors } from 'celebrate';
const app = express();
const PORT = process.env.PORT ?? 3030;

// Middleware
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use(notesRoutes);

// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);
// обробка помилок від celebrate (валідація)
app.use(errors());
// Middleware для обробки помилок (останнє)
app.use(errorHandler);

// Connect to MongoDB and start the server
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
