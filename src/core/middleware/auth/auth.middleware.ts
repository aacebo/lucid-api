import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';
import * as boom from '@hapi/boom';

import { Config } from '../../config';
import { Cache } from '../../cache';
import { Logger } from '../../logger';
import { ILoginPayload, UserModel } from '../../../controllers';

const NO_AUTH_PATHS: { [path: string]: string } = {
  '/login': 'PATCH',
  '/user': 'POST',
};

export async function auth(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  if (NO_AUTH_PATHS[ctx.path] !== ctx.method) {
    try {
      const payload = jwt.verify(ctx.get('Authorization').replace('Bearer ', ''), Config.instance.env.secret) as ILoginPayload;

      if (payload) {
        ctx.user = Cache.instance.get(payload.id);
      }

      if (payload && !ctx.user) {
        ctx.user = await UserModel.findById(payload.id).lean();
        Cache.instance.set(payload.id, ctx.user);
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
