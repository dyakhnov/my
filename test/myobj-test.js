var expect = require('chai').expect;
var myobj = require('../src/myobj');

describe('myobj', function() {
	it('should return pre-defined string', function() {
		var st = new myobj('David,Rudd,60050,9%,01 March - 31 March');
		expect(st.getOutput()).to.equal('David Rudd,01 March - 31 March,5004,922,4082,450');
	});
	it('should return pre-defined string', function() {
		var st = new myobj('Ryan,Chen,120000,10%,01 March - 31 March');
		expect(st.getOutput()).to.equal('Ryan Chen,01 March - 31 March,10000,2696,7304,1000');
	});
});