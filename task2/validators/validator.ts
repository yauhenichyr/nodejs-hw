import Joi from '@hapi/joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator
  } from 'express-joi-validation';

const validator = createValidator();

const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
});

export const validatorMW = validator.body(userSchema);

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string,
        password: string,
        age: number,
    }
}