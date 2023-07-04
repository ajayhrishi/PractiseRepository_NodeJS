require('dotenv').config({path:'./config.env'}); // will read the file and add it to the enviroment variable

const mongooes = require('mongoose');
// using the require('mongoose') we are connecting the MongoDB driver to the code for using the features. 

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
// Taking the DATABASE URL for us to access it in future and using the replace() we are updating the actual passowrd inside in the place of the <PASSWORD> placeholder. 

mongooes.connect(DB,{ 
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(conn=>{console.log('Success');}) 
/*
Connecting the DB link to our program with the help of mongoose driver that we created before along with one of it's connect property. 
Connect will always return a promise, so we were able to use the .then to see the return Promise object from the connect function
*/

const app = require('./app');
const port = process.env.PORT || 3000; 
console.log(process.env.DATABASE_PASSWORD);  // if you are entering the process.env as alone then it will not show the config.env data inside it. But using the dot operator and it's name you can access it. 

app.listen(port,console.log(`The app is currently listening to the port ${port} ...`));    //app.listen will start the server. 


