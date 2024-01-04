"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserDbSchema_1 = __importDefault(require("../dbmodels/UserDbSchema"));
const graphql_1 = require("graphql");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (args) => {
    const { email, password, name } = args;
    const hashPassword = await bcrypt_1.default.hash(password, 12);
    const user = new UserDbSchema_1.default({ email, name, password: hashPassword });
    await user.save();
    return 'User created successfully. You can now login';
};
exports.registerUser = registerUser;
const loginUser = async (_, args) => {
    const { email, password } = args;
    const user = await UserDbSchema_1.default.findOne({ email });
    if (!user) {
        throw new graphql_1.GraphQLError('Invalid Credentials', {
            extensions: { code: 'FORBIDDEN' },
        });
    }
    const comparePassword = await bcrypt_1.default.compare(password, user.password);
    if (!comparePassword) {
        throw new graphql_1.GraphQLError('Invalid Credentials', {
            extensions: { code: 'BAD_REQUEST' },
        });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, 'SomeBigDarkSecret');
    return { token };
};
exports.loginUser = loginUser;
