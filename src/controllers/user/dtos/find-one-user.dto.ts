import * as joi from '@hapi/joi';

export const FIND_ONE_USER = joi.object().keys({
  id: joi.string().required().length(24)
});
