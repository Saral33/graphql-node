"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const ProductDbSchema_1 = __importDefault(require("../dbmodels/ProductDbSchema"));
const createProduct = async (userId, args) => {
    const { name, description } = args;
    const product = new ProductDbSchema_1.default({ name, description, createdBy: userId });
    await product.save();
    return 'Successfully created product';
};
exports.createProduct = createProduct;
const getProducts = async () => {
    const products = await ProductDbSchema_1.default.find({}).populate('createdBy', [
        '_id',
        'name',
    ]);
    return products;
};
exports.getProducts = getProducts;
const getProductById = async (id) => {
    const product = await ProductDbSchema_1.default.findById(id);
    return product;
};
exports.getProductById = getProductById;
