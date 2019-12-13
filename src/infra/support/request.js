import { curryN } from 'ramda';
import Joi from 'joi';

const parse = curryN(2, (schema, data) => {
  try {
    const options = {
      abortEarly: false,
    }

    const prettyError = (error) => {
      if (error) {
        const { name, details, annotate } = error;

        return { name, details, annotate };
      }
    };
  
    const { error, value } = Joi.validate(data, schema, options);
  
    if (error) {
      return prettyError(error);
    }

    return value;
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  parse,
}