"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rootResolver = {
    Query: {
        products: () => (0, productController_1.getProducts)(),
        product: (_, args) => (0, productController_1.getProductById)(args.id),
    },
    Mutation: {
        createProduct: (_, args, ctx) => (0, authMiddleware_1.authMiddleware)(ctx, productController_1.createProduct, args),
        registerUser: (_, args) => (0, userController_1.registerUser)(args),
        loginUser: userController_1.loginUser,
    },
};
exports.default = rootResolver;
