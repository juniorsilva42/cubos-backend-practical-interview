import { curryN, compose, objOf } from 'ramda';
import { normalizeErrors } from './errors/normalizer';

const buildErrorPayload = compose(
  objOf('errors'),
  normalizeErrors
);

const buildSuccessResponse = curryN(2, (statusCode, data) => ({
  statusCode,
  body: data,
}));

const buildFailureResponse = curryN(2, (statusCode, data) => ({
  statusCode,
  body: buildErrorPayload(data),
}));

module.exports = {
  buildErrorPayload,
  buildSuccessResponse,
  buildFailureResponse,
};
