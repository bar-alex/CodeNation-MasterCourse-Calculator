let str = '5+6+4+(4-34*(2+3)';
// let str = '';
console.log( (str.match(/\(/g) || []).length );