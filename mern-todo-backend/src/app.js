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

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

// connectDB();

// mongoose
//   .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
//   .then(() => {
//     console.log(
//       'MongoDB database connection estabilshed successfully',
//     );
//   })
//   .catch(error => {
//     console.log('Error: ', error);
//   });

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Backend Server Listening on port ${process.env.PORT}`);
});
