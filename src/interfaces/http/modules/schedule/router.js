/*
 * External Dependencies
*/
import { Router } from 'express';
import Status from 'http-status';
import shortUuid from 'short-uuid';

/*
 * Internal Dependencies
*/
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
import { findData } from '../../../../infra/support/ds/findData';
import { isEmptyObject } from '../../../../infra/jayess-db/util';

/**
 * Router of schedule rules module
 *
 * @return {router} router verbs of schedule rules
*/
module.exports = ({
  jayessdb,
  response: { Success, Fail },
}) => {
  const router = Router();

  /**
   * Private function to verify if there is a shock in the date ranges for one day
   *
   * @param {array} schedules data array of schedule
   * @param {object} dateRuleToCreate object with date and intervals info
   *
   * @return {boolean} true if not exists chock of intervals 
  */
  const _scheduleIsAllowed = (schedules, dateRuleToCreate) => {
    const schedulers = schedules;
    let validDate;

    if (dateRuleToCreate.at) {
      validDate = validateDate(dateRuleToCreate.at);
    } else {
      validDate = 'unknown';
    }

    if (schedulers.length > 0) {
      for (let schedule of schedulers) {
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
        } else {
          // not same date
          return true;
        }
      }
    }
  };

  /**
   * Endpoint to get all rules of schedule
   *
   * @param {object} req express req
   * @param {object} res express res
   *
   * @return {*}
  */
  router.get('/rules', async (req, res) => {
    // Get all rules
    const data = jayessdb.getAll('scheduleRules');
        
    if (data.length === 0) {
      return res.status(Status.NOT_FOUND).json(Fail('There aren\'t registered rules'));
    }

    return res.status(Status.OK).json(Success(data));
  });

  /**
   * Endpoint to get schedule rules by given interval
   *
   * @param {object} req express req
   * @param {object} res express res
   *
   * @return {*}
  */
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

        // Filter data to avoid elemens with -1 getTime() date
        const filterData = data.filter((el) => el.dateRule.atTime !== -1);

        // Find elements with range date interval based on Binary Seach Algorithm
        const seekData = findData(filterData, { from: startDate, to: endDate });

        return res.status(Status.OK).json(Success(seekData));
      }
    } else {
      return res.status(Status.FORBIDDEN).json(Fail('Badly formatted date range'));
    }
  });

  /**
   * Endpoint to create a new schedule rule
   *
   * @param {object} req express req
   * @param {object} res express res
   *
   * @return {*}
  */
  router.post('/rules', async (req, res) => {
    const id = shortUuid.generate();

    let dateInfo = {};
    let intervalsToCreate;
    let valid = null;

    const {
      attendanceType,
      doctor,
      dateRule,
    } = req.body;
    
    intervalsToCreate = dateRule.intervals;

    if (dateRule.at) {
      const { at } = dateRule;

      // Mount date info to create
      dateInfo = {
        atTime: validateDate(at).getTime(),
        hasDate: true,
      };

      // Verify if has schedule rule for this date
      const scheduleRules = jayessdb.getByFindWithFilter('scheduleRules');

      if (scheduleRules.length > 0) {
        for (let scheduleRule of scheduleRules) {
          const { atTime, intervals } = scheduleRule.dateRule;
          
          // Trying to create a rule for an existing day
          if (atTime === dateInfo.atTime) {
            // Get intervals
            for (let interval of intervals) {
              const { start, end } = interval;

              const startHourToCompare = formatAndSetHour(start, validateDate(at));
              const endHourToCompare = formatAndSetHour(end, validateDate(at));

              if (intervalsToCreate) {
                for (let intervalToCreate of intervalsToCreate) {
                  const startHourToCreate = formatAndSetHour(intervalToCreate.start, validateDate(at));
                  const endHourToCreate = formatAndSetHour(intervalToCreate.end, validateDate(at));

                  // verify intervals
                  if((startHourToCreate >= startHourToCompare && endHourToCreate <= endHourToCompare)){
                    valid = false;
                  } else {
                    valid = true;
                  }
                }
              }
            }
          }
        }
      }      
    } else {
      dateInfo = {
        atTime: -1,
        hasDate: false,
      };
    }

    if (dateRule.type) {
      // valid by types weekly or daily
    }

    const createBody = {
      id,
      attendanceType,
      doctor,
      dateRule: {
        ...dateInfo,
        ...dateRule,
      },
    };

    // Pass body data to validate with predefined schema
    const data = parse(createSchema, createBody);
    
    if (!valid) {
      return res.status(Status.FORBIDDEN).json(Fail(`This time slot is already reserved for ${dateRule.at}`));
    }

    if (data.valid) {
      // Append schedule rule data rejecting valid property of Joi
      jayessdb.append('scheduleRules', reject(data, ['valid']));

      return res.status(Status.CREATED).json(Success(data));
    }

    return res.status(Status.FORBIDDEN).json(Fail(data));
  });

  /**
   * Endpoint to delete a schedule rule
   *
   * @param {object} req express req
   * @param {object} res express res
   * @param {string} id param of schedule rule
   *
   * @return {*}
  */
  router.delete('/rules/:id', async (req, res) => {
    const { id } = req.params;

    const data = jayessdb.del('scheduleRules', { id });

    if (!data) {
      return res.status(Status.NOT_FOUND).json(Fail(`Schedule rule with id ${id} not found`));
    }

    return res.status(Status.OK).json(Success(data));
  });

  return router;
};
