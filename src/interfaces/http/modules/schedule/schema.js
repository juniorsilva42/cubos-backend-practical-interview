import Joi from 'joi';

const createSchema = {
  attendanceType: Joi
    .string()
    .required(),

  doctor: Joi
    .string()
    .required(),

  dateRule: Joi
    .object({ at: Joi.string(), intervals: Joi.array().items({ start: Joi.string(), end: Joi.string() }) }),
}

module.exports = { createSchema };