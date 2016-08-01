const fs = require('fs'),
	readline = require('readline'),
	rl = readline.createInterface({
		input: fs.createReadStream('./data/my.csv')
	});

var myobj = require('../src/myobj');

// Read the stream
rl.on('line', (line) => {
	// Load data into object and clean
	var st = new myobj(line);
	if (!st.error) {
		console.log(st.getOutput());
	} else {
		console.log(st.message);
		console.log(JSON.stringify(st, null, 4));
	}
});