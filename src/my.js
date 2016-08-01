var dataFile = [
  'David,Rudd,60050,9%,01 March - 31 March',
  'Ryan,Chen,120000,10%,01 March - 31 March'
];

var keys = 'firstName,lastName,annualSalary,superRate,datesRange'.split(',');

var loadedData = [],
  outputData = [];

function calculateIncomeTax(taxableIncome) {
  if (taxableIncome <= 18200) {
    return 0;
  } else if (taxableIncome <= 37000) {
    return (taxableIncome - 18200) * 0.19;
  } else if (taxableIncome <= 80000) {
    return 3572 + (taxableIncome - 37000) * 0.325;
  } else if (taxableIncome <= 180000) {
    return 17547 + (taxableIncome - 80000) * 0.37;
  } else {
    return 54547 + (taxableIncome - 180000) * 0.45;
  }
}

function cleanData(obj) {
  obj.superRate = obj.superRate.replace('%', '');
  return obj;
}

function validateData(obj) {
  if (obj.firstName.length === 0) {
    return 'Empty First Name';
  }
  if (obj.lastName.length === 0) {
    return 'Empty Last Name';
  }
  var _annualSalary = parseInt(obj.annualSalary, 10) || -1;
  if (_annualSalary === 0) {
    return 'Incorrect Annual Salary, must be numeric';
  }
  var _superRate = parseInt(obj.superRate, 10) || -1;
  if (_superRate === -1) {
    return 'Incorrect Super Rate Salary, must be numeric';
  } else if (_superRate < 0 || _superRate > 50) {
    return 'Incorrect Super Rate Salary, must be within 0-50% range';
  }
  return '';
}

// Load and validate data
dataFile.forEach(function(strLine) {
  var st = {},
    d = strLine.split(',');
  // Load data into object
  for (var k in keys) {
    st[keys[k]] = d.shift().trim();
  }
  if (d.length !== 0) {
    console.log('ERR: Following line has more data than required:', d);
  } else {
    // Clean data
    st = cleanData(st);
    // Validate data
    var v = validateData(st);
    if (v.length !== 0) {
      console.log('ERR: Following data is invalid:', v, st);
    } else {
      // Calculate additional fields
      st.grossIncome = Math.round(st.annualSalary / 12);
      st.incomeTax = Math.round(calculateIncomeTax(st.annualSalary) / 12);
      st.netIncome = st.grossIncome - st.incomeTax;
      st.superAmount = Math.round(st.grossIncome * st.superRate / 100);
      // Store data
      loadedData.push(st);
    }
  }
});

// Create output
loadedData.forEach(function(st) {
  outputData.push([st.firstName + ' ' + st.lastName, st.datesRange, st.grossIncome, st.incomeTax, st.netIncome, st.superAmount].join(','));
});

var testFile = [
  'David Rudd,01 March - 31 March,5004,922,4082,450',
  'Ryan Chen,01 March - 31 March,10000,2696,7304,1000'
];

// Test output
var passOK = true;
for (var i = 0; i < outputData.length; i++) {
  if (outputData[i].localeCompare(testFile[i]) !== 0) {
    console.log('ERROR:');
    console.log(outputData[i]);
    console.log(testFile[i]);
    console.log('===');
    passOK = false;
  }
}

if (passOK) {
  outputData.forEach(function(strLine) {
    console.log(strLine);
  })
}