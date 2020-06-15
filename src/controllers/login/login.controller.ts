import * as Router from 'koa-router';

import * as middleware from '../../core/middleware';
import * as dtos from './dtos';
import * as endpoints from './endpoints';

export const login = new Router({
  prefix: '/login',
})
.patch('/', middleware.request(dtos.LOGIN), (ctx, next) => endpoints.login(ctx, next));
