import * as Koa from 'koa';

import { removeProps } from '../../utils/remove-props';
import { IResponse } from './response.interface';

export async function response(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  if (ctx.path.indexOf('/attachment/') === -1) {
    const res: IResponse = {
      user: ctx.user ? removeProps(ctx.user, ['password']) : undefined,
      meta: {
        length: ctx.response.body ? ctx.response.body.length : undefined,
        total: ctx.total,
      },
      links: {
        self: ctx.originalUrl,
        ...(ctx.pageLinks || {}),
      },
      data: ctx.response.body && ctx.response.body instanceof Object ? removeProps(ctx.response.body, ['password']) : ctx.response.body,
    };

    ctx.body = res;
  }

  await next();
}
