import * as joi from '@hapi/joi';

export const CREATE_AUTH = joi.object().keys({
  origin: joi.string().length(1),
  email: joi.string().email().required(),
  firstName: joi.string().min(3).max(100).required(),
  lastName: joi.string().min(3).max(100).required(),
  password: joi.string().required(),
  dob: joi.date(),
});
