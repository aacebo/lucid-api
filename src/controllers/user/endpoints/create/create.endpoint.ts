import * as Koa from 'koa';
import * as boom from '@hapi/boom';

import { UserModel } from '../../user.entity';

export async function create(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  const user = await UserModel.findOne({ email: ctx.request.body.email });

  if (user) {
    const err = boom.conflict().output.payload;
    ctx.throw(err.statusCode, 'email already exists');
  } else {
    const res = new UserModel({
      ...ctx.request.body,
    });

    ctx.body = await res.save();
  }

  await next();
}
