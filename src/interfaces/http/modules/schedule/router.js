import { Router } from 'express';
import Status from 'http-status';
import shortUuid from 'short-uuid';

import { 
  validateTwoRangeInterval,
  isValidDate,
  isValidHour,
  validateDate,
  formatAndSetHour,
} from '../../../../infra/support/helpers/date';
import { createSchema } from './schema';
import { parse } from '../../../../infra/support/request';
import { reject } from '../../../../infra/support/helpers/util';
import { findElementsBasedOnBinarySearch } from '../../../../infra/support/ds/binarySearch';

/**
 * Router of attendance module
 *
 * @return {router} router verbs of attendance
*/
module.exports = ({
  logger,
  jayessdb,
  response: { Success, Fail },
}) => {
  const router = Router();

  const scheduleIsAllowed = (schedules, dateRuleToCreate) => {
    const validDate = validateDate(dateRuleToCreate.at);

    if (schedules.length > 0) {
      for (let schedule of schedules) {
        const { dateRule } = schedule;

        if (isValidDate(dateRule.at) && dateRule.at === dateRuleToCreate.at) {
          const { intervals: intervalsToCreate } = dateRuleToCreate;

          if (intervalsToCreate.length > 0) {
            for (let intervalToCreate of intervalsToCreate) {
              if (isValidHour(intervalToCreate.start) && isValidHour(intervalToCreate.end)) {
                const startHourToCreate = formatAndSetHour(intervalToCreate.start, validDate);
                const endHourToCreate = formatAndSetHour(intervalToCreate.end, validDate);

                // Iterate over intervals of result from db based on date of creation rule                    
                const { intervals } = dateRule;
                
                for (let interval of intervals) {
                  if (isValidHour(interval.start) && isValidHour(interval.end)) {
                    const startHourToCompare = formatAndSetHour(interval.start, validDate);
                    const endHourToCompare = formatAndSetHour(interval.end, validDate);

                    if((startHourToCreate >= startHourToCompare && startHourToCreate <= endHourToCompare) ||
                       (endHourToCreate >= startHourToCompare && endHourToCreate <= endHourToCompare )){
                        return false;
                    } else {
                      return true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  router.get('/rules', async (req, res) => {
    // Get all rules
    const data = jayessdb.getAll('scheduleRules');
        
    return res.status(Status.OK).json(Success(data));
  });

  router.get('/rules/:interval', async (req, res) => {
    const { interval } = req.params;

    if (interval) {
      const dates = interval.split('::');

      if (dates.length <= 1) {
        return res.status(Status.FORBIDDEN).json(Fail('Badly formatted date range'));
      }

      const startDate = validateDate(dates[0]);
      const endDate = validateDate(dates[1]);
      
      // Verify if start end final dates are valid
      // And ensure which date must be less than or equal to end date
      if (isValidDate(dates[0]) && isValidDate(dates[1]) && validateTwoRangeInterval({ startDate: dates[0], endDate: dates[1] })) {
        // seek data with date range interval
        const data = jayessdb.getAll('scheduleRules');
        
        // Find elements with range date interval based on Binary Seach Algorithm
        const seekedData = findElementsBasedOnBinarySearch(data, { from: startDate, to: endDate });

        return res.status(Status.OK).json(Success(seekedData));      
      }
    } else {
      return res.status(Status.FORBIDDEN).json(Fail('Badly formatted date range'));
    }
  });

  router.post('/rules', async (req, res) => {
    const id = shortUuid.generate();

    const { dateRule } = req.body

    const createBody = {
      id,
      ...req.body,
    };

    // Pass body data to validate with predefined schema
    const data = parse(createSchema, createBody);

    if (data.valid) {
      // Get all data to validate
      const allSchedule = jayessdb.getAll('scheduleRules');

      if (scheduleIsAllowed(allSchedule, dateRule)) {
        // Append schedule rule data rejecting valid property of Joi
        jayessdb.append('scheduleRules', reject(data, ['valid']));

        return res.status(Status.OK).json(Success(data));
      } else {
        return res.status(Status.FORBIDDEN)
          .json(Fail(`There is a rule in this same range for ${dateRule.at} date`));
      }
    } 
    
    // return res.status(Status.FORBIDDEN).json(Fail(data));
  });

  router.delete('/rules/:id', async (req, res) => {
    const { id } = req.params;

    const data = jayessdb.del('scheduleRules', { id }); 

    return res.status(Status.OK).json(Success(data));
  });

  return router;
};
