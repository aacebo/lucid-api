import * as Koa from 'koa';
import * as boom from '@hapi/boom';

import { UserModel } from '../../user.entity';

export async function remove(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  const user = await UserModel.findById(ctx.params.id);

  if (!user) {
    const error = boom.notFound().output.payload;
    ctx.throw(error.statusCode, 'user not found');
  } else if (user._id.toString() !== ctx.user._id.toString()) {
    const error = boom.unauthorized().output.payload;
    ctx.throw(error.statusCode, error.message);
  } else {
    user.removedAt = new Date();
    ctx.body = await user.save();
  }

  await next();
}
