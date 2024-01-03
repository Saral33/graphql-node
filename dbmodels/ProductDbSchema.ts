import mongoose, { ObjectId, Schema } from 'mongoose';

interface IProduct {
  name: string;
  description: string;
  createdBy: ObjectId;
}
const schema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

const Product = mongoose.model<IProduct>('Product', schema);

export default Product;
