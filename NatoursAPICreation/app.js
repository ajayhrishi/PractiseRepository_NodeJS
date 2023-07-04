/** 
app.get('/',(req,res)=>{
    res.status(200) // will. create the header with the status of 200. // status() is what help us to create the header. res.status().json() is an example of methoad chaining in JS. 
                    // we can also change it to status of 404, in that case it will send the repsponse back and if the user will be able to see the failed to load 404 console.error on thier browser. 
    .json({name:'Ajay HRishi V', age: '23'}); // will send the jason object as data. 
   // if we just want to set a string, then can use .send('String Content');
   // we can also write it in two lines like res.status(200); and res.json(data); the current fomate will help to reduce the number of lines. 
});
app.post('/', (req,res)=>{
res.status(200).send('You have reached the postingEndpoint, you can post you datas here. ');
});
*/

//============================================= Pratical ====================================================//
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

const tourRouter = require('./Routes/TourRoutes.js');
const userRouter = require('./Routes/UserRoutes.js');

/*morgan is a popular middleware that is helps login.
inside the margan(x) the x is the value that decide which type of login we need to use. eg: dev, combined, common, short, tiny. 
*/
// --------------------------- Creating a custom middleware for testing purpose - Tested and working. 

app.use((req, res, next) => {
    console.log('this is from middleware, hello there');
    next();
});
// ------------ Routes -------------------
/*
app.get('/api/v1/tours',getAllTours);
app.post('/api/v1/tours',addTour); 
app.get(`/api/v1/tours/:id`, getTourByID);
app.patch(`/api/v1/tours/:id`, updateTour);
app.delete(`/api/v1/tours/:id`,deleteTour);

Instead of using the end point like one by one we can use the route methoad to do this for us. 

*/


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/*
tourRouter and user Rtouer are the Router middlewares. 
when we use the app.use('/api/v1/tours', tourRouter)l
*/


module.exports = app;

