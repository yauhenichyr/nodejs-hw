import Joi from '@hapi/joi';
import { groupType } from '../types/groupType';
import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator
  } from 'express-joi-validation';

const validator = createValidator();

const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().required(),
});

export const groupValidator = validator.body(groupSchema);

export interface GroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        name: string,
        permissions: Array<groupType>,
    }
}