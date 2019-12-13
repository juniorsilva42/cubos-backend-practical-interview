import chai, { expect, should, assert } from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server/app';

chai.use(chaiHttp);

// Chai globals config
global.request = chai.request;
global.expect = expect;
global.should = should;
global.assert = assert;

// App globals config
global.defaultServerPath = 'http://localhost:5000/api/v1';
global.server = server;
