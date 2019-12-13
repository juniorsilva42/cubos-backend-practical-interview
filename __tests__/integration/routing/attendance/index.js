describe('Route: /attendance/rules to handle with rules', () => {
  describe('GET /attendace/rules', () => {
    it('should return a list of rules', done => {
      request 
        .get('/attendance')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it('should return create a new rule', done => {
      request 
        .get('/attendance')
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });
  });
});
