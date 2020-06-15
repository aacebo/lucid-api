import * as Koa from 'koa';
import * as joi from '@hapi/joi';
import * as boom from '@hapi/boom';

export function request(schema: joi.Schema, options?: joi.ValidationOptions, type: 'body' | 'params' | 'query' = 'body') {
  return async (ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) => {
    const obj: any = type === 'body' ? ctx.request : ctx;
    const valid = schema.validate(obj[type], options);

    if (valid.error) {
      const err = boom.badRequest().output.payload;
      ctx.throw(err.statusCode, valid.error.message);
    }

    await next();
  };
}
