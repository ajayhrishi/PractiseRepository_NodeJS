/*
class Calculator {
    add (a,b){return a+b;}
    multiply(a,b){return a*b;}
    divide(a,b){return a/b;}
    reduce(a,b){return a-b;}
}

module.exports = Calculator; // now this class will get exported. (import exports are working as a event emmiter and receiver way)

*/

// another way of exporting this class

module.exports = class {
    add (a,b){return a+b;}
    multiply(a,b){return a*b;}
    divide(a,b){return a/b;}
    reduce(a,b){return a-b;}
}


// Tested and working. 

// way of exporting properties and arrow functions  // best pratcise. 

/**
 exports.add = (a,b)=>{return a+b;}
 exports.multiply = (a,b)=>{return a*b;}
 exports.divide = (a,b)=>{return a/b;}
 exports.reduce = (a,b)=>{return a-b;} 
 */

/*
you do like two ways. 

1. 
const C = require('filename.js `);
c.add(5,7);

2.   // we will use more often. 
const {add,multiply} = require('filename.js');
add(5,7);

*/

// this will also work.

