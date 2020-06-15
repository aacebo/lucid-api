import * as joi from '@hapi/joi';

export const LOGIN = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
