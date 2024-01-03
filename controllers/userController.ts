import bcrypt from 'bcrypt';
import User from '../dbmodels/UserDbSchema';
import { GraphQLError } from 'graphql';
import JWT from 'jsonwebtoken';

export interface ILoginUser {
  email: string;
  password: string;
}
export interface ICreateUser extends ILoginUser {
  name: string;
}

const registerUser = async (args: ICreateUser) => {
  const { email, password, name } = args;
  const hashPassword = await bcrypt.hash(password, 12);
  const user = new User({ email, name, password: hashPassword });
  await user.save();

  return 'User created successfully. You can now login';
};

const loginUser = async (_: any, args: ILoginUser) => {
  const { email, password } = args;
  const user = await User.findOne({ email });
  if (!user) {
    throw new GraphQLError('Invalid Credentials', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new GraphQLError('Invalid Credentials', {
      extensions: { code: 'BAD_REQUEST' },
    });
  }

  const token = JWT.sign({ id: user.id }, 'SomeBigDarkSecret');
  return { token };
};

export { registerUser, loginUser };
