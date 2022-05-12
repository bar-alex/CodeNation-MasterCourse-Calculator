
import background from './assets/background.jpg';
import background1 from './assets/background1.jpg';
import background2 from './assets/background2.jpg';

let cycleInterval = 5;    // 10 seconds
let backgroundImages = [
    background,
    background1,
    background2,
];


// cycle through background
const cycleBackgrounds = (seconds = cycleInterval) => setInterval(() => {
    const rnd = Math.floor( Math.random() * backgroundImages.length );
    const styleText = `fixed no-repeat url("${backgroundImages[rnd]}")`;
    document.body.style.background = styleText;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
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