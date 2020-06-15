import * as Koa from 'koa';
import * as qs from 'qs';

export async function pagination(ctx: Koa.ParameterizedContext<any>, next: () => Promise<any>) {
  const page = +ctx.query.page || 0;
  const pageSize = +ctx.query.pageSize || 5;
  const sort: string = ctx.query.sort || 'updatedAt';
  const sortDirection: 'asc' | 'desc' = ctx.query.sortDirection || 'desc';
  const self = qs.stringify({
    ...ctx.query,
    page,
    pageSize,
    sort,
    sortDirection,
  });

  const nxt = qs.stringify({
    ...ctx.query,
    page: page + 1,
    pageSize,
    sort,
    sortDirection,
  });

  const prev = qs.stringify({
    ...ctx.query,
    page: page - 1,
    pageSize,
    sort,
    sortDirection,
  });

  ctx.query.page = page;
  ctx.query.pageSize = pageSize;
  ctx.query.sort = sort;
  ctx.query.sortDirection = sortDirection;

  ctx.pageLinks = {
    self: `${ctx.path}?${self}`,
    next: `${ctx.path}?${nxt}`,
    previous: page > 0 ? `${ctx.path}?${prev}` : undefined,
  };

  await next();
}
