import mongoose, { Schema } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
}
const schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', schema);

export default User;
