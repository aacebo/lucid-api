import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';
import * as boom from '@hapi/boom';

import Config from '../../../../core/config/config';
import { UserModel } from '../../../user/user.entity';
import { ILoginPayload } from '../../login-payload.interface';

export async function findOne(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  const payload: ILoginPayload = jwt.verify(ctx.request.body.token, Config.env.secret) as any;
  const user = await UserModel.findOne({ _id: payload.id, email: payload.email });

  if (!user) {
    const err = boom.notFound().output.payload;
    ctx.throw(err.statusCode, 'user not found');
  } else {
    user.lastLoggedInAt = new Date();
    ctx.user = await user.save();
    ctx.body = ctx.request.body.token;
  }

  await next();
}
