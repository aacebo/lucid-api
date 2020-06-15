import * as Router from 'koa-router';

import * as middleware from '../../core/middleware';
import * as dto from './dtos';
import * as endpoints from './endpoints';

export const user = new Router({
  prefix: '/user',
})
.get('/', middleware.pagination, middleware.request(dto.FIND_USER, undefined, 'query'), (ctx, next) => endpoints.find(ctx, next))
.get('/:id', middleware.request(dto.FIND_ONE_USER, undefined, 'params'), (ctx, next) => endpoints.findOne(ctx, next))
.post('/', middleware.request(dto.CREATE_USER), (ctx, next) => endpoints.create(ctx, next))
.patch('/:id', middleware.request(dto.FIND_ONE_USER, undefined, 'params'), middleware.request(dto.UPDATE_USER), (ctx, next) => endpoints.update(ctx, next))
.delete('/:id', middleware.request(dto.FIND_ONE_USER, undefined, 'params'), (ctx, next) => endpoints.remove(ctx, next));
