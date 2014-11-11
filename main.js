
(function() {

  'use strict';

  var submitBtn,
      inputDateEle,
      outputMessageEle,
      validateInput,
      getInput,
      outputMessage,
      dateToTimestamp,
      permute;

  //  when the DOM is ready...
  window.onload = function() {

    //  grab the DOM elements
    inputDateEle =
    document.querySelector('input[name="input-date"]');

    inputDateEle.focus();

    submitBtn =
    document.querySelector('input[name="submit-button"]');

    outputMessageEle =
    document.querySelector('#result-date');

    //  attach a handler to the button click
    submitBtn.onclick = function() {

      var inputValue,
          inputDigits,
          isValid,
          earliestDate,
          possibleMatches = [];

      inputValue = getInput();
      inputDigits = validateInput(inputValue);
      isValid = !!inputDigits;

      if(!isValid) {
        outputMessage('Wrong input');
        return true;
      }

      //  make all the possible combinations
      permute(inputDigits)
      .forEach(function(combination) {

        //  for each one, try to get a Date timestamp
        var possibleDate = dateToTimestamp.apply(null, combination);

        if(
          !isNaN(possibleDate) &&
          possibleMatches.indexOf(possibleDate) === -1
        ) {
          //  if that combination produced a timestamp, save it
          possibleMatches
          .push(possibleDate);
        }

      });

      //  sort the timestamps we got, and the first one is the smallest
      //  so it's the earliest date
      possibleMatches.sort(function(a, b) {
        a = +a;
        b = +b;
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      earliestDate =
      new Date(possibleMatches[0]);


      //  display the result
      outputMessageEle.textContent =
      '( ' + possibleMatches.length + ' possible date(s) found ) ' +
      'earliest date is : ' + earliestDate.toString().slice(0, 15);
    };

  };


  validateInput = function(stringDate) {

    var matches,
        invalidDigits = false,
        yearFound = false;

    if(typeof stringDate !== 'string' || stringDate === '') {
      return false;
    }

    matches = stringDate.match(/^(\d{1,4})\/(\d{1,4})\/(\d{1,4})$/);

    if(matches === null) {
      return false;
    }

    //  check if we have a number with 3 digits ( invalid )
    matches
    .slice(1, 4)
    .forEach(function(match) {

      var year;

      if(match.length === 3) {
        invalidDigits = true;
      }

      if(match.length === 4) {
        if( match < 2000 || match > 2999 ){
          invalidDigits = true;
        }
      }

    });

    if(invalidDigits) {
      return false;
    }

    return matches.slice(1, 4);
  };


  dateToTimestamp = function(a, b, c) {

    var newDate = (new Date(a + '/' + b + '/' + c));
    return newDate.getTime();
  };

  getInput = function() {
    return inputDateEle.value;
  };

  outputMessage = function(message) {
    outputMessageEle.textContent = message;
  };


  permute = function(input) {

    var permArr = [],
        usedChars = [];

    function main() {
      var i, ch;
      for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
          permArr.push(usedChars.slice());
        }
        main();
        input.splice(i, 0, ch);
        usedChars.pop();
      }
      return permArr;
    }

    return main();
  };

})();
