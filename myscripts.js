$(document).ready(function() {
  let result = 0;
  let pEntry = 0;
  let cEntry = '0';
  let expre = '';
  let fix = 0;
  let temp = 0;
  updateScreen(result);
  
  $('.button').on('click', function(evt) {
    var bPress = $(this).html();
    console.log(bPress);
  
  try {
    
    if (bPress === 'C') {
      result = 0;
      pEntry = 0;
      expre = '';
      cEntry = '0';
      fix = 0;
    } 
    else if (bPress === 'CE') {
      cEntry = '0';
    } 
    else if (bPress === '.') {
      cEntry += '.';
      temp = 1;
    } 
    else if (isNumber(bPress)) {  
      if (cEntry === '0') cEntry = bPress;
      else cEntry = cEntry + bPress;
      
      if (temp > 0) temp++;
      if (fix < temp) fix = temp;
    } 
    else if (isOperator(bPress)) {
      if (expre.includes('=')){
        cEntry = '';
        expre = pEntry;
      }

      if (bPress === '(') {
        expre += ' ' + bPress;
      }
      else {         
        expre += cEntry + ' ' + bPress + ' ';
        cEntry = '';
      }
      temp = 0;   
    } 
    else if (bPress === '=') {
      expre += cEntry;
      result = eval(expre);
      cEntry = result;
      if (fix !== 0) cEntry = cEntry.toPrecision(fix);
      expre += ' ' + bPress + ' ';2
      pEntry = cEntry;
      temp = 0;
    }
  }
  catch (e){
    expre = e;
  }
  finally{
    updateScreen(cEntry,expre);
  }
  });
});

updateScreen = function(displayValue,expre) {
  var displayValue = displayValue.toString();
  $("#input").html(displayValue.substring(0, 10));
  $("#expre").html(expre);
};

isOperator = function(value) {
  return value === '/' || value === '*' || value === '+' || value === '-' ||
         value === '(' || value === ')';
};


isNumber = function(value) {
  return !isNaN(value);
}