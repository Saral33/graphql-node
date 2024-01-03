import mongoose from 'mongoose';

export const connectDb = () =>
  mongoose
    .connect(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb_container:27017`
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));

export default mongoose;
