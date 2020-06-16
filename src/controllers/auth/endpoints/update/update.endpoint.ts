import * as Koa from 'koa';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import * as boom from '@hapi/boom';

import { UserModel } from '../../../user';
import { Config } from '../../../../core/config';
import { ILoginPayload } from '../../login-payload.interface';

export async function update(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  const user = await UserModel.findOne({
    email: ctx.request.body.email,
    password: md5(ctx.request.body.password),
    removedAt: { $eq: undefined },
  });

  if (!user) {
    const error = boom.notFound().output.payload;
    ctx.throw(error.statusCode, 'user not found');
  } else {
    user.lastLoggedInAt = new Date();
    const ret = await user.save();

    ctx.user = ret;
    ctx.body = jwt.sign({
      id: ret.id,
      email: ret.email,
    } as ILoginPayload, Config.instance.env.secret);
  }

  await next();
}
