import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
dotenv.config();
//import connectDB from './db.js';

function startServer() {
  const PORT = process.env.PORT || 3000;

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //await connectDB(); // Connect to MongoDB

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server is running on port ${PORT}`);
  });
}

export default startServer;
