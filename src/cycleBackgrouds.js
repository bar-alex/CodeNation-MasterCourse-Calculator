
import background1 from './assets/background1.jpg';
import background2 from './assets/background2.jpg';
import background3 from './assets/background3.jpg';
import background4 from './assets/background4.jpg';
import background5 from './assets/background5.jpg';
import background6 from './assets/background6.jpg';
import background7 from './assets/background7.jpg';
import background8 from './assets/background8.jpg';

let cycleInterval = 30;    // 10 seconds
let backgroundImages = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8,
];


// cycle through background
const cycleBackgrounds = (seconds = cycleInterval) => setInterval(() => {
    const rnd = Math.floor( Math.random() * backgroundImages.length );
    const styleText = `fixed no-repeat url("${backgroundImages[rnd]}")`;
    document.body.style.background = styleText;
    document.body.style.backgroundSize = 'cover';
    // document.body.style.backgroundAttachment = 'fixed';
}, 1000 * seconds);  // 5 min ->  1000*60*5

// const cycleBackgrounds = (seconds = cycleInterval) => void setTimeout( setInterval(() => {
//     const rnd = Math.floor( Math.random() * backgroundImages.length );
//     const styleText = `fixed no-repeat url("${backgroundImages[rnd]}")`;
//     document.body.style.background = styleText;
//     document.body.style.backgroundSize = 'cover';
//     document.body.style.backgroundAttachment = 'fixed';
// }, 1000 * seconds    // 5 min ->  1000*60*5
// ), 1000 * seconds);  // for the initial switch, from the on set in css

// export the only function
export default cycleBackgrounds;