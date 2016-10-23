import { describe, it } from 'mocha';
import chai from 'chai';
import sinon from 'sinon';

const should = chai.should();

import dropdown from '../dropdown';

describe('dropdown(client, dropdown)', () => {

  it('is a fucntion', () => {
    dropdown.should.be.a('function');
  });

  it('requires a client argument', () => {
    should.Throw(dropdown, 'Missing `client` argument');
  });

  it('requires a dropdown id argument', () => {
    should.Throw(dropdown.bind(null, {}), 'Missing `dropdown` argument');
  });

  it('returns an object with a send property', () => {
    let d = dropdown({}, 'abcdef');
    d.should.be.a('object');
    d.should.have.property('send');
  });

  describe('.send(expression)', () => {

    let send;
    let client;

    beforeEach(() => {
      client = {};
      client.post = sinon.stub().returns(Promise.resolve({
        message: {
          option: 1
        },
        options: [{
          id: 1,
          value: 'option-value'
        }]
      }));
      send = dropdown(client, 'dropdown-id').send;
    });

    it('is a function', () => {
      send.should.be.a('function');
    });

    it('requires an expression argument', () => {
      should.Throw(send, 'Missing `expression` argument');
    });

    it('passes the right arguments to the client', () => {
      send('Hello World');
      client.post.lastCall.args[0].should.equal('dropdown/messages');
      client.post.lastCall.args[1].should.deep.equal({
        message: {
          dropdown: 'dropdown-id',
          expression: 'Hello World'
        }
      });
    });

    it('retrieves the associated option', () => {
      return send('Hello World')
        .then(option => {
          option.should.equal('option-value');
        })
    });

  });

});
