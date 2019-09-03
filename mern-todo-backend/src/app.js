import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

// import Todo from './models/ToDo';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/todos', todoRoutes);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(
      'MongoDB database connection estabilshed successfully',
    );
  })
  .catch(error => {
    console.log('Error: ', error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Backend Server Listening on port ${process.env.PORT}`);
});
