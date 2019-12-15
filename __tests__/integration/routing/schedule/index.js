import shortUuid from 'short-uuid';

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
        });

      done();
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
        });

      done();
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
        });

      done();
    });
  });

  describe('DELETE /schedule/rules', () => {   
    it('should return null when trying to delete a nonexistent rule', (done) => {
      request
        .delete('/schedule/rules/homer-simpson')
        .end((err, res) => {
          expect(res).to.have.status(404);
        });

      done();
    });

    it('should delete a created schedule rule', done => {
      let id = shortUuid.generate();

      const mockScheduleRuleDailyRestrition = {
        id,
        attendanceType: "Test",
        doctor: "Test",
        dateRule: {
          type: "daily",
          intervals: [
            { start: "08:00", end: "09:00" }
          ]
        }      
      };
      
      request 
        .post('/schedule/rules')
        .type('json')
        .send(mockScheduleRuleDailyRestrition)
        .end((err, res) => {
          expect(res).to.have.status(201);;
          const { id } = res.body.data;

          if (id) {
            request
              .delete(`/schedule/rules/${id}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
              });
          }
        });

      done();
    });      
  });

  describe('Create some rules with fixed date to mock tests', () => {
    it('should return a list of rules if rules is not empty', (done) => {
      request
        .get('/schedule/rules')
        .end((err, res) => {
          expect(res).to.have.status(200);
          
          if (res.data) {
            to.isAbove(res.data.length, 1);
          }
        });

      done();
    });

    it('should return a list of rules by range interval date', (done) => {
      request
        .get('/schedule/rules/25-10-19::27-10-19')
        .end((err, res) => {
          expect(res).to.have.status(200);
          
          if (res.data) {
            expect(res.data.length).to.equal(3);
          }
        });

      done();
    });      
  });  

  describe('GET /schedule/rules', () => {
    before('Insert some intervals', () => {
      const mock1 = {
        id: shortUuid.generate(),
        attendanceType: "Oncology",
        doctor: "Test Alisson, M.D",
        dateRule: {
          at: "26-10-2019",
          intervals: [
            { start: "17:00", end: "18:00" }
          ]
        }      
      };

      const mock2 = {
        id: shortUuid.generate(),
        attendanceType: "Oncology",
        doctor: "Test Alisson, M.D",
        dateRule: {
          at: "27-10-2019",
          intervals: [
            { start: "18:00", end: "19:00" }
          ]
        }      
      };

      const mock3 = {
        id: shortUuid.generate(),
        attendanceType: "Oncology",
        doctor: "Test Alisson, M.D",
        dateRule: {
          at: "28-10-2019",
          intervals: [
            { start: "19:00", end: "20:00" }
          ]
        }      
      };    
      
      // Create case 1
      request.post('/schedule/rules').type('json').send(mock1).end();

      // Create case 2        
      request.post('/schedule/rules').type('json').send(mock2).end();

      // Create case 3        
      request.post('/schedule/rules').type('json').send(mock3).end();
    });
        
    it('should return a list of rules if rules is not empty', (done) => {
      request
        .get('/schedule/rules')
        .end((err, res) => {
          expect(res).to.have.status(200);
          
          if (res.data) {
            to.isAbove(res.data.length, 1);
          }
        });

      done();
    });

    it('should return a list of rules by range interval date', (done) => {
      request
        .get('/schedule/rules/25-10-19::27-10-19')
        .end((err, res) => {
          expect(res).to.have.status(200);
          
          if (res.data) {
            expect(res.data.length).to.equal(3);
          }
        });

      done();
    });   
  });  
});
