import shortUuid from 'short-uuid';
import jayessdb from '../../../../src/infra/jayess-db';

describe('Route: /schedule/rules to handle with rules', () => {
  beforeEach(() => {
    jayessdb.init({ db: 'cubos-db-test.json', documents: { scheduleRules: [] } });
  });

  describe('GET /schedule/rules', () => {
    it('should return a message if not exists rules', done => {
      request 
        .get('/schedule/rules')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.error).to.equal('There aren\'t registered rules');

          done();
        });
    });
  });

  describe('POST /schedule/rules', () => {
    const id = shortUuid.generate();

    const mockScheduleRule = {
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
    
    it('should create a new schedule rule', done => {
      request 
        .post('/schedule/rules')
        .type('json')
        .send(mockScheduleRule)
        .end((err, res) => {
          expect(res).to.have.status(201);

          done();
        });
    });
  });
});
