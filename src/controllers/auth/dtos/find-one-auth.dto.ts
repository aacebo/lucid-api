import * as joi from '@hapi/joi';

export const FIND_ONE_AUTH = joi.object().keys({
  token: joi.string().required(),
});
