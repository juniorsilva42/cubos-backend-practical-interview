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
  validateDate,
  formatAndSetHour,
  isConsistentDate,
  formatter,
} from '../../../../infra/support/helpers/date';
import { createSchema } from './schema';
import { parse } from '../../../../infra/support/request';
import { reject } from '../../../../infra/support/helpers/util';
import { findData } from '../../../../infra/support/ds/findData';

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

        if (seekData.length === 0) {
          return res.status(Status.NOT_FOUND)
            .json(Fail(`There aren't rules for the interval from ${dates[0]} to ${dates[1]}`));
        }

        return res.status(Status.OK).json(Success(seekData));
      } 

      return res.status(Status.UNPROCESSABLE_ENTITY)
        .json(Fail('Invalid formatted date at range date interval'));
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
    let validStatements = {
      forDate: true,
      forDaily: true,
    };
    const unavailableRules = [];

    const {
      attendanceType,
      doctor,
      dateRule,
    } = req.body;
    
    intervalsToCreate = dateRule.intervals;
    
    // Get all from db
    const scheduleRules = jayessdb.getByFindWithFilter('scheduleRules');

    if (dateRule.at) {
      const { at } = dateRule;

      if (!isConsistentDate(at)) {
        return res.status(Status.UNPROCESSABLE_ENTITY)
          .json(Fail('The date is invalid! Try to schedule for today or future days!'));
      }

      // Mount date info to create
      dateInfo = {
        atTime: validateDate(at).getTime(),
        hasDate: true,
      };

      if (scheduleRules.length > 0) {
        for (let scheduleRule of scheduleRules) {
          const { atTime, intervals } = scheduleRule.dateRule;
          
          // Trying to create a rule for an existing day
          if (atTime === dateInfo.atTime) {
            // Get intervals from database
            for (let interval of intervals) {
              const { start, end } = interval;

              const startHourToCompare = formatAndSetHour(start, validateDate(at));
              const endHourToCompare = formatAndSetHour(end, validateDate(at));

              if (intervalsToCreate) {
                for (let intervalToCreate of intervalsToCreate) {
                  const startHourToCreate = formatAndSetHour(intervalToCreate.start, validateDate(at));
                  const endHourToCreate = formatAndSetHour(intervalToCreate.end, validateDate(at));

                  // verify intervals
                  if(
                    (startHourToCreate >= startHourToCompare && endHourToCreate <= endHourToCompare) || 
                    (endHourToCreate >= startHourToCompare && endHourToCreate <= endHourToCompare)                    
                  ){
                    validStatements.forDate = false;
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

    // Verify daily restritions
    if (dateRule.type) {
      const definedDate = formatter(new Date()).atDateInstance;

      // TO-DO: valid by types weekly or daily
      if (dateRule.type === 'daily') {
        for (let scheduleRule of scheduleRules) {
          const { intervals, at } = scheduleRule.dateRule;

          for (let interval of intervals) {
            const { start, end } = interval;
  
            const startHourToCompare = formatAndSetHour(start, definedDate);
            const endHourToCompare = formatAndSetHour(end, definedDate);
              
            if (intervalsToCreate) {
              for (let intervalToCreate of intervalsToCreate) {
                const startHourToCreate = formatAndSetHour(intervalToCreate.start, definedDate);
                const endHourToCreate = formatAndSetHour(intervalToCreate.end, definedDate);
  
                // verify intervals
                if(
                  (startHourToCreate >= startHourToCompare && endHourToCreate <= endHourToCompare) || 
                  (endHourToCreate >= startHourToCompare && endHourToCreate <= endHourToCompare)
                 ){
                  validStatements.forDaily = false;
                  unavailableRules.push({ at, interval });
                }
              }
            }              
          }          
        }
      }
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
    
    if (!validStatements.forDaily) {
      const returnStatement = {
        message: 'This time slot is already reserved for daily rule',
        unavailableRules,
      };

      return res.status(Status.FORBIDDEN)
        .json(Fail(returnStatement));
    }

    if (!validStatements.forDate) {
      return res.status(Status.FORBIDDEN).json(Fail(`This time slot is already reserved for ${dateRule.at || dateRule.type} date rule`));
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

    if (data.length === 0) {
      return res.status(Status.NOT_FOUND).json(Fail(`Schedule rule with id ${id} not found`));
    }

    return res.status(Status.OK).json(Success(data));
  });

  return router;
};
