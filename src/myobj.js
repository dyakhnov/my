var method = stObj.prototype;

method.constructor = stObj;

// Constructor
function stObj(line) {
  this.raw = line;
  this.error = false;
  this.message = '';
  if (typeof line != 'undefined') {
    var d = this.raw.split(',');
    var keys = 'firstName,lastName,annualSalary,superRate,datesRange'.split(',');
    for (var k in keys) {
      try {
        this[keys[k]] = d.shift().trim();
      } catch (e) {
        this.error = true;
        this.message = 'ERROR - Following line has less data than required and will be ignored:\n' + this.raw;
      }
    }
    if (!this.error) {
      if (d.length !== 0) {
        this.error = true;
        this.message = 'ERROR - Following line has more data than required and will be ignored:\n' + this.raw;
      }
      this.cleanData();
      var v = this.validateData();
      if (v.length !== 0) {
        this.error = true;
        this.message = 'ERROR - Following data is invalid:\n' + v;
      } else {
        // Calculate additional fields
        this.grossIncome = Math.round(this.annualSalary / 12);
        this.incomeTax = Math.round(this.calculateIncomeTax(this.annualSalary) / 12);
        this.netIncome = this.grossIncome - this.incomeTax;
        this.superAmount = Math.round(this.grossIncome * this.superRate / 100);
      }
    }
  } else {
    this.error = true;
    this.message = 'ERROR - Can\'t parse line:\n' + line;
  }
}

method.calculateIncomeTax = function(taxableIncome) {
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

method.cleanData = function() {
  this.superRate = this.superRate.replace('%', '');
  return this;
};

method.validateData = function() {
  if (this.firstName.length === 0) {
    return 'Empty First Name';
  }
  if (this.lastName.length === 0) {
    return 'Empty Last Name';
  }
  var _annualSalary = parseInt(this.annualSalary, 10) || -1;
  if (_annualSalary === 0) {
    return 'Incorrect Annual Salary, must be numeric';
  }
  var _superRate = parseInt(this.superRate, 10) || -1;
  if (_superRate === -1) {
    return 'Incorrect Super Rate Salary, must be numeric';
  } else if (_superRate < 0 || _superRate > 50) {
    return 'Incorrect Super Rate Salary, must be within 0-50% range';
  }
  return '';
};

method.getOutput = function() {
  return [this.firstName + ' ' + this.lastName, this.datesRange, this.grossIncome, this.incomeTax, this.netIncome, this.superAmount].join(',');
}

module.exports = stObj;