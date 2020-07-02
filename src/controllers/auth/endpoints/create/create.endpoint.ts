import * as Koa from 'koa';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import * as boom from '@hapi/boom';

import { UserModel } from '../../../user/user.entity';
import { ILoginPayload } from '../../login-payload.interface';
import Config from '../../../../core/config/config';

export async function create(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  const user = await UserModel.findOne({ email: ctx.request.body.email });

  if (user) {
    const err = boom.conflict().output.payload;
    ctx.throw(err.statusCode, 'email already exists');
  } else {
    const res = new UserModel({
      ...ctx.request.body,
      password: md5(ctx.request.body.password),
      lastLoggedInAt: new Date(),
    });

    ctx.user = await res.save();
    ctx.body = jwt.sign({
      id: res.id,
      email: res.email,
    } as ILoginPayload, Config.env.secret);
  }

  await next();
}
