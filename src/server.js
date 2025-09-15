import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
dotenv.config();
import Contact from './models/contacts.js';
let contact;

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

  app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to the Contacts API',
  });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await Contact.find();

    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
  });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      contact = await Contact.findById(id);
    }
    catch {
      res.status(404).json({
		    message: 'Contact not found'
	    });
	    return;
    }
    

    res.json({
      status: 200,
	    message: `Successfully found contact with id ${id}!`,
      data:  contact ,
    });
});
  
  app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
    });
  });

    app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Internal server error',
    });
  });

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server is running on port ${PORT}`);
  });

}

export default startServer;
