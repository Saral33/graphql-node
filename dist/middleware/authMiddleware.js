"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const graphql_1 = require("graphql");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserDbSchema_1 = __importDefault(require("../dbmodels/UserDbSchema"));
const authMiddleware = async (req, callback, _a) => {
    var rest = __rest(_a, []);
    try {
        if (req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            // jwt.verify(token, 'SomeBigDarkSecret', async (err, decoded: any) => {
            //   if (err) {
            //     console.log(err);
            //     throw new GraphQLError('Token is invalid');
            //   }
            //   const user = await User.findById(decoded?.id);
            //   if (!user) {
            //     throw new GraphQLError('User not found');
            //   }
            //   callback(user?.id, { ...rest });
            // });
            const decoded = await jsonwebtoken_1.default.verify(token, 'SomeBigDarkSecret');
            if (!decoded) {
                throw new graphql_1.GraphQLError('Token Invalid');
            }
            const user = await UserDbSchema_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
            if (!user) {
                throw new graphql_1.GraphQLError('User not found');
            }
            return callback(user === null || user === void 0 ? void 0 : user.id, Object.assign({}, rest));
        }
        else {
            throw new graphql_1.GraphQLError('Token Error');
        }
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error.message || error);
    }
};
exports.authMiddleware = authMiddleware;
