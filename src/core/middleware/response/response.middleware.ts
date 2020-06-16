import * as Koa from 'koa';

import { IResponse } from './response.interface';

export async function response(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  const res: IResponse = {
    user: ctx.user,
    meta: {
      length: ctx.response.body ? ctx.response.body.length : undefined,
      total: ctx.total,
    },
    links: {
      self: ctx.originalUrl,
      ...(ctx.pageLinks || {}),
    },
    data: ctx.response.body,
  };

  ctx.body = res;

  await next();
}
