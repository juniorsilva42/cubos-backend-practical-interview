describe('Server status', () => {
  it('The server must be online', (done) => {
    request(`${defaultServerPath}/attendance`)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
      });
  });
});
