import shortUuid from 'short-uuid';
import container from '../../../../src/container';

const jayessdb = container.resolve('jayessdb');

describe('Route: /schedule/rules to handle with rules', () => {  
  describe('POST /schedule/rules', () => {   
    it('should create a new schedule rule with daily restrition', done => {
      let id = shortUuid.generate();

      const mockScheduleRuleDailyRestrition = {
        id,
        attendanceType: "Pathology",
        doctor: "Test House, M.D",
        dateRule: {
          type: "daily",
          intervals: [
            { start: "15:00", end: "16:00" }
          ]
        }      
      };
      
      request 
        .post('/schedule/rules')
        .type('json')
        .send(mockScheduleRuleDailyRestrition)
        .end((err, res) => {
          expect(res).to.have.status(201);

          done();
        });
    });

    it('should create a new schedule rule with weekly restrition', done => {
      let id = shortUuid.generate();

      const mockScheduleRuleWeeklyRestrition = {
        id,
        attendanceType: "Pathology",
        doctor: "Test House, M.D",
        dateRule: {
          type: "weekly",
          days: ['monday', 'friday'],
          intervals: [
            { start: "13:00", end: "15:00" }
          ]
        }      
      };

      request 
        .post('/schedule/rules')
        .type('json')
        .send(mockScheduleRuleWeeklyRestrition)
        .end((err, res) => {
          expect(res).to.have.status(201);

          done();
        });
    });

    it('should create a new schedule rule with fixed date restrition', done => {
      let id = shortUuid.generate();

      const mockScheduleRuleFixedDate = {
        id,
        attendanceType: "Oncology",
        doctor: "Test Alisson, M.D",
        dateRule: {
          at: "25-10-2019",
          intervals: [
            { start: "17:00", end: "18:00" }
          ]
        }      
      };

      request 
        .post('/schedule/rules')
        .type('json')
        .send(mockScheduleRuleFixedDate)
        .end((err, res) => {
          expect(res).to.have.status(201);

          done();
        });
    });
  });
});
