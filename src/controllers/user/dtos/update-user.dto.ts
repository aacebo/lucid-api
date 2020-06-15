import * as joi from '@hapi/joi';

export const UPDATE_USER = joi.object().keys({
  image: joi.string().length(24),
  origin: joi.string().length(1),
  email: joi.string().email(),
  firstName: joi.string().min(3).max(100),
  lastName: joi.string().min(3).max(100),
  password: joi.string(),
});
