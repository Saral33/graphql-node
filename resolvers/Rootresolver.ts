import { Request } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  IcreateProduct,
} from '../controllers/productController';
import {
  ICreateUser,
  loginUser,
  registerUser,
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const rootResolver = {
  Query: {
    products: () => getProducts(),
    product: (_: any, args: { id: string }) => getProductById(args.id),
  },
  Mutation: {
    createProduct: (_: any, args: IcreateProduct, ctx: Request) =>
      authMiddleware(ctx, createProduct, args),
    registerUser: (_: any, args: ICreateUser) => registerUser(args),
    loginUser: loginUser,
  },
};

export default rootResolver;
