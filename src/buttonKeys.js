
import { isDigit } from "./formulaHelpers";

// general for the app, used by outside functions as well
const labelDigits = '123 456 789 0.≋'.replaceAll(' ','').split(''); // ≋ is special
const labelFuncs =  '+⌫C -() *√% /='.replaceAll(' ','').split('');  // = will occupy 2 spaces


// will handle the keypress
const handleKey = (evt) => {
  // get the pressed key
  let evtKey = evt.key.toLowerCase();
  let evtCode = evt.code.toLowerCase();
  let lbl = 
    evtKey === 'enter' ? '=' :
    evtKey === 'escape' ? 'C' :
    evtKey === 'backspace' ? '⌫' :
    evtCode.slice(0,6) === 'numpad' && isDigit( evtCode.slice(6,7) ) ? evtCode.slice(6,7) :
    evtCode === 'numpaddecimal' ? '.' :
    evtKey;

  console.log('handleKey: ','evtKey = ',evtKey,'evtCode = ',evtCode, 'lbl = ', lbl);

  // all the keys in just one big string
  const allKeys = [...labelDigits, ...labelFuncs].join('');
  // if the keypress is not in the keys string then return
  if(allKeys.indexOf(lbl)===-1) 
    return;

  // if not returned then prevent default 
  evt.preventDefault();
  // find the button for a visual effect
  const btn = document.querySelector(`.btn[label='${lbl}']`);
  // console.log('getButtonForLabel -> ',btn);
  // hope for a visual feedback by simulating a click
  if(btn) {
    btn.focus()
    // const keyEvt = new KeyboardEvent('keydown',{'keyCode':32,'which':32});
    // btn.dispatchEvent( keyEvt );
    btn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    // console.log('handleKey', evt, 'dispatch', keyEvt );
  }
};

// like an intro or something .. cool
const specialFunc = () => window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// bind the keydown to document
const bindButtonKeyListener = () => document.addEventListener('keydown',handleKey);


export {
    labelDigits,            // the digits from which to create the buttons
    labelFuncs,             // the functions keys for operations
    bindButtonKeyListener,  // will bind the keydown event and handle the pressed key
    specialFunc,
}