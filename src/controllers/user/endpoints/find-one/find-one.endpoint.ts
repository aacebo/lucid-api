import * as Koa from 'koa';
import * as boom from '@hapi/boom';

import { UserModel } from '../../user.entity';

export async function findOne(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  ctx.body = await UserModel.findById(ctx.params.id);

  if (!ctx.body) {
    const error = boom.notFound().output.payload;
    ctx.throw(error.statusCode, 'user not found');
  }

  await next();
}
