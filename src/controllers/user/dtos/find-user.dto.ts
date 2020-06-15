import * as joi from '@hapi/joi';

import { PAGINATION } from '../../../core/middleware';

export const FIND_USER = joi.object().keys({
  ...PAGINATION,
});
