describe('Server status', () => {
  it('The server must be online', (done) => {
    request 
      .get('/_health_check')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });

    done();
  });
});
