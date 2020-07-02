import * as Router from 'koa-router';

import * as middleware from '../../core/middleware';
import * as dtos from './dtos';
import * as endpoints from './endpoints';

export const auth = new Router({
  prefix: '/auth',
})
.patch('/:id', middleware.request(dtos.FIND_ONE_AUTH), (ctx, next) => endpoints.findOne(ctx, next))
.patch('/', middleware.request(dtos.UPDATE_AUTH), (ctx, next) => endpoints.update(ctx, next))
.post('/', middleware.request(dtos.CREATE_AUTH), (ctx, next) => endpoints.create(ctx, next));
