import * as Koa from 'koa';

import { Logger, LogLevel } from '../../logger';
import { bytesToString } from '../../utils/bytes-to-string';

export async function logger(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  const start = new Date();
  await next();
  const end = new Date();
  const elapse = end.getTime() - start.getTime();

  ctx.set('X-Response-Time', `${elapse}ms`);

  Logger.bulk([
    { text: `[${ctx.user ? ctx.user.email : 'anonymous'}] -> `, level: LogLevel.Success },
    { text: `${ctx.method} `, level: LogLevel.Info },
    { text: `${ctx.path}, `, level: LogLevel.Info },
    { text: `${ctx.status}, `, level: ctx.status === 200 ? LogLevel.Success : ctx.status === 500 ? LogLevel.Error : LogLevel.Warn },
    { text: `${bytesToString(ctx.response.length)}, `, level: LogLevel.Info },
    { text: `${elapse}ms`, level: LogLevel.Info },
  ]);
}
