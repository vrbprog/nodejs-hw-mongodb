import { getEnvVar } from '../utils/getEnvVar.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function initMongoConnection() {
  const user = getEnvVar('MONGODB_USER');
  const pwd = getEnvVar('MONGODB_PASSWORD');
  const url = getEnvVar('MONGODB_URL');
  const db = getEnvVar('MONGODB_DB');
  const dbUrl = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

  await mongoose
    .connect(dbUrl);
  return console.log('Mongo connection successfully established!');
}
