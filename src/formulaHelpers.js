
import { evaluate, round } from 'mathjs';

// checks if the specified character is a digit
const isDigit = (x) => '1234567890'.indexOf(x)>-1;

// parse the formula for the the √ symbol
const evalForSqrt = (textForm) => {
  // console.log('~~~~ has sqrt at: ',  textForm.indexOf('√'));
  let openSqrtFlag = false;
  
  if( textForm.indexOf('√')>-1 ){
    for(let i=0;i<textForm.length;i++){
      let chr = textForm[i];
      let chrNext = textForm[i+1];
      // const isDigit = (x) => '1234567890'.indexOf(x)>-1;
      // console.log(':i = ',i, 'c:',chr, 'n:',chrNext);
      // a sqrt is open, we need to close it after the number
      if(openSqrtFlag){
        // console.log('^i',i, 'chr',chr, 'chrNext',chrNext ,'openSqrtFlag',openSqrtFlag, 'digit?', isDigit(chrNext), 'len',textForm.length, 'formula:',textForm );
        // the next is either not a digit or the formula stops ~~ '5+√4' => '5+sqr(4'
        if(!isDigit(chrNext) || i+1===textForm.length){
          // console.log('%+i',i,'s[i]',chr, 's[i+1]', chrNext, 'openSqrtFlag',openSqrtFlag, 'is-digit?',isDigit(chrNext), 'textForm.length',textForm.length, 'formula:',textForm );
          textForm = `${textForm.slice(0, i+1)})${textForm.slice(i+1)}`;
          i+=1;
          openSqrtFlag=false;
          // console.log('%-i',i,'s[i]',chr, 's[i+1]', chrNext, 'openSqrtFlag',openSqrtFlag, 'is-digit?',isDigit(chrNext), 'textForm.length',textForm.length, 'formula:',textForm );
        }
      } else 
        // if this char is the sqrt symbol
        if(chr==='√')
          // if next one is a parenthesis ~ '5+√(' => '5+sqrt('
          if(chrNext==='('){
            // console.log('*+i',i,'s[i]',textForm[i], 'openSqrtFlag',openSqrtFlag, 's[i+1]',chrNext,'len', textForm.length, 'formula:',textForm );
            textForm = textForm.replace('√','sqrt');
            i += 3;
            // console.log('*-i',i,'s[i]',textForm[i], 'openSqrtFlag',openSqrtFlag, 's[i+1]',chrNext,'len', textForm.length, 'formula:',textForm );
          } else {  // next one is not a parenthesis ~ '5+√4' => '5+sqrt(4'
            // console.log('#+i',i,'s[i]',textForm[i], 'openSqrtFlag',openSqrtFlag, 's[i+1]',chrNext,'len', textForm.length, 'formula:',textForm );
            textForm = textForm.replace('√','sqrt(');
            i += 4;
            openSqrtFlag = true;  // so i know i have to close it // won't work with nested sqrts
            // console.log('#-i',i,'s[i]',textForm[i], 'openSqrtFlag',openSqrtFlag, 's[i+1]',chrNext,'len', textForm.length, 'formula:',textForm );
          }
    }
  }
  // returns the changed text
  return textForm;
};


// will validate the '='
// if evaluate throws an error it will return the formula
const resolveEqual = ( text ) => {
  let result;
  try{
    result = round( evaluate( evalForSqrt(text) ) ,2);
  } catch(err){
    console.log('evalFormula -> err', err);
    result = text;
  } finally{
    result = result.toString();
  }
  console.log('evalFormula -> result is', result);
  return result;
};


// pressing the closing parenthesis will close an open one or insert a new one at the beginning
const closeParenthesis = (text) => {
  // no text, nothing to work with
  if( text.replaceAll(' ','')==='' ) return text;
  // get the number of open and closed parentheses
  let countOpen   = (text.match(/\(/g) || []).length;
  let countClosed = (text.match(/\)/g) || []).length;
  // if open are one more, i'll just add the closing one, else i'll add an open one at the beginning as well
  if(countOpen === countClosed+1)
    text += ')';
  else 
    text = '(' + text + ')';
  // i return the changed text
  return text;
};


export {
    isDigit,            // determine if the parameter is a digit
    evalForSqrt,        // will parse the text and replace the √ wit sqrt()
    resolveEqual,       // will eval the formula into a value, if formula is invalid the formula is returned
    closeParenthesis,   // will check if the closing parenthesis to be added has a matching open parenthesis, if not, it will ad an open one at the beginning
}