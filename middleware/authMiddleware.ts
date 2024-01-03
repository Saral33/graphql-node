import express from 'express';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import User from '../dbmodels/UserDbSchema';

export const authMiddleware = async (
  req: express.Request,
  callback: any,
  { ...rest }
) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
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
      const decoded: any = await jwt.verify(token, 'SomeBigDarkSecret');
      if (!decoded) {
        throw new GraphQLError('Token Invalid');
      }
      const user = await User.findById(decoded?.id);
      if (!user) {
        throw new GraphQLError('User not found');
      }

      return callback(user?.id, { ...rest });
    } else {
      throw new GraphQLError('Token Error');
    }
  } catch (error: any) {
    throw new GraphQLError(error.message || error);
  }
};
