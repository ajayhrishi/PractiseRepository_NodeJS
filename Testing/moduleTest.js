//==================================================================================================================================================================================== 
//console.log(arguments); 
/* when you console log it, you will get the below ouput, just to prove each files are treated as module and they are a function as well. 

[Arguments] {         ***** this is all the arguments in this file, JS treat each file as modules and it has the props passing through them.  ***
  '0': {},      -> this is where all the exports will be stored.
  '1': [Function: require] {   -> this is the require function.
    resolve: [Function: resolve] { paths: [Function: paths] },
    main: Module {
      id: '.',
      path: 'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\Testing',
      exports: {},
      filename: 'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\Testing\\moduleTest.js',
      loaded: false,
      children: [],
      paths: [Array]
    },
    extensions: [Object: null prototype] {
      '.js': [Function (anonymous)],
      '.json': [Function (anonymous)],
      '.node': [Function (anonymous)]
    },
    cache: [Object: null prototype] {
      'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\Testing\\moduleTest.js': [Module]
    }
  },
  '2': Module {    -> this is the module object.
    id: '.',        
    path: 'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\Testing',
    exports: {},
    filename: 'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\Testing\\moduleTest.js',
    loaded: false,
    children: [],
    paths: [
      'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\Testing\\node_modules',
      'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\node_modules',
      'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\node_modules',
      'H:\\Studies\\Software Engineer\\Git-Repositories\\node_modules',
      'H:\\Studies\\Software Engineer\\node_modules',
      'H:\\Studies\\node_modules',
      'H:\\node_modules'
    ]
  },
  '3': 'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\Testing\\moduleTest.js',
  '4': 'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\PractiseRepository_NodeJS-main\\Testing'
}
PS H:\Studies\Software Engineer\Git-Repositories\NodeJS\PractiseRepository_NodeJS-main\Testing> 
====================================================================================================================================================================================
*/
// console.log(require('module').wrapper); 

/* you will get the output of 

[
  '(function (exports, require, module, __filename, __dirname) { ',   // the wrapper function that helps with exports and imports along with some other important features.
  '\n});'
]
====================================================================================================================================================================================
*/
const C = require('./Calculator.js'); // the value assigned to the module.exports in the Calculator.js file. is the Claculator class in that file. So here the same class will be assigned to Vairable C
const operator = new C();   // Now to use the class as usual we use the new keyword and assign it to a vairiable. Here it is oeprator

console.log(operator.add(5,8)); // operator will be class and the add is the funciton that we defined on Calculor.js file inside the Calculator class. 
//tested and working. 
