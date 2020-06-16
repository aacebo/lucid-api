import * as mongoose from 'mongoose';
import * as md5 from 'md5';

import { UserOrigin } from './user-origin.enum';
import { capitalize } from '../../core/utils';

export class User {
  readonly _id: string | mongoose.Types.ObjectId;
  image: string;
  readonly origin: UserOrigin;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  readonly createdAt: Date;
  updatedAt: Date;
  removedAt?: Date;
  lastLoginAt?: Date;

  constructor(private readonly _args?: Partial<User>) {
    Object.assign(this, this._args);
  }
}

export interface IUserDocument extends User, mongoose.Document {
  readonly _id: string | mongoose.Types.ObjectId;
}

export const UserModel = mongoose.model<IUserDocument>('User', new mongoose.Schema<User>({
  image: { type: String },
  origin: { type: UserOrigin, default: UserOrigin.LOCAL, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true, set: capitalize },
  lastName: { type: String, required: true , set: capitalize },
  password: { type: String, set: md5 },
  removedAt: { type: Date },
  lastLoginAt: { type: Date },
}, {
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}));

