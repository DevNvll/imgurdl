var assert = require("assert");
var imgurdl = require('../imgurdl');

describe('imgurdl', function() {
  it('imgurdl.clientid should return the clientID that was set', function() {
    imgurdl.setClientId('clientidTest');
    assert.equal(imgurdl.clientid, 'clientidTest');
	});
});
