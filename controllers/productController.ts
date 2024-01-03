import Product from '../dbmodels/ProductDbSchema';

export interface IcreateProduct {
  name: string;
  description: string;
}

const createProduct = async (userId: string, args: IcreateProduct) => {
  const { name, description } = args;
  const product = new Product({ name, description, createdBy: userId });

  await product.save();
  return 'Successfully created product';
};

const getProducts = async () => {
  const products = await Product.find({}).populate('createdBy', [
    '_id',
    'name',
  ]);
  return products;
};

const getProductById = async (id: string) => {
  const product = await Product.findById(id);

  return product;
};

export { createProduct, getProducts, getProductById };
