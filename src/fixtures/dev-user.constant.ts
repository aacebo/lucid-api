import * as mongoose from 'mongoose';
import * as md5 from 'md5';

import { User } from '../controllers/user';

export const DEV_USER: Partial<User> = {
  _id: mongoose.Types.ObjectId.createFromHexString('000000013efe40642a17a496'),
  email: 'dev@dev.com',
  firstName: 'Dev',
  lastName: 'Dev',
  password: md5('testing123!'),
};
