import startServer from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

try {
  await initMongoConnection();
  startServer();
} catch (error) {
  console.error('Error starting the server:', error);
}
