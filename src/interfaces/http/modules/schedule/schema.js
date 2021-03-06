import Joi from 'joi';

const createSchema = {
  id: Joi
    .string()
    .required(),

  attendanceType: Joi
    .string()
    .required(),

  doctor: Joi
    .string()
    .required(),

  dateRule: Joi
    .object({
      at: Joi.string(),
      atTime: Joi.number(),
      type: Joi.string(),
      days: Joi.array().items(Joi.string()),
      intervals: Joi.array().items({ start: Joi.string(), end: Joi.string() }),
      hasDate: Joi.boolean().required(),
    }),
};

module.exports = { createSchema };
