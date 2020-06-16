import * as joi from '@hapi/joi';

export const UPDATE_AUTH = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
