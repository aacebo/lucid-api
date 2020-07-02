import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';
import * as boom from '@hapi/boom';

import Config from '../../config/config';
import Cache from '../../cache/cache';
import { Logger } from '../../logger';
import { ILoginPayload, UserModel } from '../../../controllers';

export async function auth(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  if (ctx.path.split('/')[1] !== 'auth') {
    try {
      const payload = jwt.verify(ctx.get('Authorization').replace('Bearer ', ''), Config.env.secret) as ILoginPayload;

      if (payload) {
        ctx.user = Cache.get(payload.id);
      }

      if (payload && !ctx.user) {
        ctx.user = (await UserModel.findById(payload.id)).toJSON();
        Cache.set(payload.id, ctx.user);
      }

      if (!payload || !ctx.user) {
        const error = boom.unauthorized().output.payload;
        ctx.throw(error.statusCode, error.message);
      }
    } catch (err) {
      Logger.error(`[${ctx.method}] - [${ctx.path}] - Unauthorized`);
      const error = boom.unauthorized().output.payload;
      ctx.throw(error.statusCode, error.message);
    }
  }

  await next();
}
