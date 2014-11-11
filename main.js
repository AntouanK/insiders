

(function(){

  'use strict';

  var submitBtn,
      inputDateEle,
      outputMessageEle,
      validateInput,
      getInput,
      outputMessage;

  //  grab the DOM elements
  inputDateEle =
  document.querySelector('input[name="input-date"]');

  submitBtn =
  document.querySelector('input[name="submit-button"]');

  outputMessageEle =
  document.querySelector('#result-date');



  validateInput = function(stringDate){

    var matches,
        invalidDigits = false,
        yearFound = false;

    if(typeof stringDate !== 'string' || stringDate === ''){
      console.log('no value');
      return false;
    }

    matches = stringDate.match(/^(\d{1,4})\/(\d{1,4})\/(\d{1,4})$/);

    if(matches === null){
      console.log('wrong format');
      return false;
    }

    console.log(matches);
    //  check if we have a number with 3 digits ( invalid )
    matches
    .slice(1,4)
    .forEach(function(match){

      var year;

      if(match.length === 3){
        invalidDigits = true;
      }

      //  check also if we got the year
      if(match.length === 4){
        if(yearFound){
          //  if year found already, we have an error
          invalidDigits = true;
          return false;
        }

        year = +match;

        if(year < 2000 || year > 2999){

        }
      }
      
    });

    if(invalidDigits){
      return false;
    }

    return matches;
  };



  getInput = function(){
    return inputDateEle.value;
  };

  outputMessage = function(message){
    outputMessageEle.textContent = message;
  };

  submitBtn.onclick = function(){

    var inputValue,
        isValid;

    inputValue = getInput();
    isValid = validateInput(inputValue);

    if(isValid === false){
      outputMessage('Wrong input');
      return true;
    }

    console.log('inputValue', inputValue);

    outputMessageEle.textContent = 'test '+ isValid;
  }



})();
