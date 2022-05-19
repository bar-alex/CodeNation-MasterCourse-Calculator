// - handles sqrt while display-ing the √
// - shows a review of the evaluated value
// - closing an unopened parenthesis will add the opening one at the beginning of the expression
// - works with mouse clicks and keyboard



// it will have the display,
//    a block of digits+dot
//    a bloc of functions: ⌫()√ˣ=
//    a controller block ? (maybe)

//  1 2 3   + ⌫  C
//  4 5 6   -  (  )
//  7 8 9   *  √  %
//  0 . 𓆌   /   =


//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { evaluate, round } from 'mathjs';

import cycleBackgrounds from './cycleBackgrouds';
import { evalForSqrt, resolveEqual, closeParenthesis } from './formulaHelpers';
import { labelDigits, labelFuncs, bindButtonKeyListener, specialFunc } from './buttonKeys';

// start the cycleBackgrounds function
cycleBackgrounds(40);   // BUG: on the first change it just jumps over without the transition

// binds to the keydown event
bindButtonKeyListener();

// the main component starts here
function App() {
  // use as state a string to hold the calculating formula
  let [ formula, setFormula ] = useState('');

  const buttonClick = (label)=>{
    console.log( label, 'was clicked; formula was:', formula );
    let newFormula = (
        label==='C'  ? '':                        // clear all text
        label==='⌫' ? formula.slice(0, -1):      // remove last character
        label==='≋'  ? formula:                   // special
        label==='='  ? resolveEqual(formula):      // the formula becomes the value
        label===')'  ? closeParenthesis(formula): // will add an open parenthesis if not a matching one
        formula + label                           // adds the letter to th
        );
    setFormula(newFormula);
    console.log( 'formula will be:', newFormula );
    label==='≋' && specialFunc();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p> 
          Calculator app created with React. 
        </p>
      </header>

      <div id="scene" class="neumorphic-main">
        <Display idComponent="display" textFormula={formula}/>
        <div id="area-digits">
          {
            labelDigits.map( (lbl,index) => 
              <CalcButton key={index} 
                label={lbl} 
                type='digit' 
                click={()=>buttonClick(lbl)}/> )
          }
        </div>
        <div id='area-functions'>
          {
            labelFuncs.map( (lbl,index) => 
              <CalcButton key={index} 
                label={lbl} 
                type={'⌫=C'.indexOf(lbl)>-1?'spec':'func'}
                click={()=>buttonClick(lbl)}/> )
          }
        </div>
      </div>
      
    </div>
  );
}


// the display element, props: idComponent, textFormula
const Display = props => {

  let textForm = props.textFormula;
  let valueForm = 0;
  
  let [lastValue, setLastValue] = useState( 0 );

  // catch the error if it doesn't evaluate proper
  try {
    // handle the sqrt symbol
    valueForm = round( evaluate( evalForSqrt(textForm) ), 2);
  } catch(err) {} finally {
    valueForm = valueForm || 0;
  }
  // console.log('formula = ', textForm, 'value = ', valueForm, 'lastValue', lastValue);

  // will show the last good value while adding operators
  if(valueForm!==0 || textForm==='') 
    setTimeout( ()=>setLastValue(valueForm) , 10) ; // calling it too fast after useState() throws a nasty error

  return (
    <div id={props.idComponent} className='neumorphic'>
      {/* <p>TEST 1 + 2 x √ ( 34 / 56 * 7 ) x 89 = 5318008</p> */}
      <p>{lastValue!==0?lastValue:''}</p>
      <p>{props.textFormula}</p>
    </div>
  )
};


// props: label, type, click
const CalcButton = props => {
  let className = props.type==='digit'
      ?'btn digit'
      :( props.type==='func' ?'btn func' :'btn spec' );
  className += ' neumorphic'

  return ( 
    <button className={ className } 
      label={props.label} 
      onClick={props.click} 

    > {props.label} </button>
  )
}


export default App;

