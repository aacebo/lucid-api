import * as Koa from 'koa';

import { UserModel } from '../../user.entity';

export async function find(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  ctx.body = await UserModel.find({
    removedAt: { $eq: undefined },
  }).sort({ [ctx.query.sort]: ctx.query.sortDirection })
    .skip(ctx.query.page * ctx.query.pageSize)
    .limit(ctx.query.pageSize);

  ctx.total = await UserModel.countDocuments({
    removedAt: { $eq: undefined },
  });

  await next();
}
