import * as joi from '@hapi/joi';

export const PAGINATION = {
  page: joi.number().min(0),
  pageSize: joi.number().min(1).max(100),
  sort: joi.string(),
  sortDirection: joi.string().valid('asc', 'desc'),
};
