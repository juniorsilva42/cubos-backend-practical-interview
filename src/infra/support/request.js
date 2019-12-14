import { curryN } from 'ramda';
import Joi from 'joi';

/**
 * Util to parse request based on given schema object
 *
 * @param {object} schema to verify body
 * @param {object} data body of request, usually req.body
 *
 * @return {*} 
*/ 
const parse = curryN(2, (schema, data) => {
  try {
    const options = {
      abortEarly: false,
    }

    const prettyError = (error) => {
      if (error) {
        const { name, details, annotate } = error;

        return { 
          name, 
          details, 
          annotate, 
          valid: false 
        };
      }
    };
  
    const { error, value } = Joi.validate(data, schema, options);
  
    if (error) {
      return prettyError(error);
    }

    return { ...value, valid: true };
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  parse,
}