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
  password: string;
  dob?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  removedAt?: Date;
  lastLoggedInAt?: Date;

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
  password: { type: String, required: true, set: md5, get: (_v: string) => '*****' },
  dob: { type: Date },
  removedAt: { type: Date },
  lastLoggedInAt: { type: Date },
}, {
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: { getters: true, versionKey: false, virtuals: false },
  toObject: { getters: true, versionKey: false, virtuals: false },
}));

