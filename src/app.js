const fs = require('fs'),
	readline = require('readline'),
	rl = readline.createInterface({
		input: fs.createReadStream('./data/my.csv')
	});
	
var myobj = require('../src/myobj');

rl.on('line', (line) => {
	if(line.length !== 0) {
		var st = new myobj(line);
		if (!st.error) {
			console.log(st.getOutput());
		} else {
			console.log(st.message);
			//console.log(JSON.stringify(st, null, 4));
		}
	}
});