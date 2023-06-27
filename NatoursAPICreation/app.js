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
app.use(express.json()); 
const fs = require('fs');
const port = 3000; 

let tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)); 

async function ReadFilePromise(url){  // Promise Creation function for Reading file
    const ReadedPromise = await new Promise((resolve, reject)=>{fs.readFile(url,(res,err)=>{
        if(err) reject(err);
        resolve(res);
    })});
    return ReadedPromise;
}
/* Note
* const app = express();  // express function will add all the features to the app variable. 
* app.use(express.json()); // adding the middleware to access the data send by the user from the req object. 
* let tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
Line to load up all the tours and store them as JSON objects ready to send when the API call happens. 
When we ready the data from the tours-simple.json it won't be as the JSON objects. to fix it we are using the JSON.parse
* async function ReadFilePromise(url){ // Promise Creation function for Reading file
*/

//--------------- End point to get all the tours. ----------------------------------
app.get('/api/v1/tours',(req,res)=>{ 
    res.status(200).json({      
        status: 'success',
        results: tours.length,
        data: {
            tours 
        }
    })
});
/*Note
app.get('/api/v1/tours',(req,res)=>{ // '/api/v1/tours is not mandatory, we can just add like /tours. but by following the current end point it is more readable and organised. 
tours //same as "tours":tours // tours is the variable that we used to store the readed data from the file tours-simple.json
*/

// ------------------- End point to post one extra tour to the existing list. 
app.post('/api/v1/tours',(req,res) =>{
    //console.log('post reqest received');
    //console.log('data in the body is ',req.body);
    const newId = tours[tours.length - 1].id+1; // will create an new id based on the last element's id in the tours object array. 
    //console.log('new Id created: ',newId );
    const newTour = Object.assign({id:newId},req.body);   // Object.assign will make a new object with the newId we created. 
    //console.log('new object created :',newTour);
    tours.push(newTour); // add the newly created Object to the current tours. 
    //console.log('added the tour to the tours variable array');
    //console.log('Current value of the tours array: ',tours);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, `[${tours.map(tour => JSON.stringify(tour)).join(', \n')}]`, err => {
        if (err) {
          // Handle the error
          console.error(err);
          res.status(500).json({ status: 'error', message: 'Failed to write data to file' });
        } else {
          res.status(201).json({
            status: 'success',
            data: { tour: newTour }
          });
        }
      });
    }); 
    
/* Note: ---------------
Even though the req do have all the data send by the user, we will not be able to directly access it. To access that data we use the middleware. 
Middleware is a function that can modify the incoming data. 
console.log(req.body);
Not using the writeFileSync becuase the code is inside a call back function. 
*/

// --------------------------- End point to get the tour with a spesific ID

app.get(`/api/v1/tours/:id`, (req,res)=>{
  console.log('the id based end API GET point in the app.js file is called')
  console.log(req.params, ' is the ID in the API is called.');
  const id = req.params.id * 1 ;

  //if(id >tours.length) {
    if(!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'File not found'
    })
  }

  const tour = tours.find(el=> el.id === id);

  

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

});

/* Note: -------------------
* :id is how we define the variable in the URL
   it could be anything like  :var :x 
* req.params is the parameters that is inside the URL, so if we enter the api end point as /api/v1/tours/10, then the value 10 will be assigned to the id variable in the endpoint that we mentioned 
  as :id
* we can also receive multiple parameters for the end point like api/v1/tours/5/10/12/13 and we can receive them to the respective vairable by designing the end point like below. 
/api/v1/tours/:id/:x/:y/:z  each values will be assigned to each of these variable one by one. 
  While doing this the number of params in the url and in the end point should match. Otherwise it won't hit the same end point that we wanted and may result in an error 

const id = req.params.id * 1 ; // to covert the data from string to a number. // Data base trick. 
find() is the function like map but will only return one element that matches to the data inside the array. 

* if(!tour) will return the error if the data is not in the array. 
*/

app.listen(port,console.log(`The app is currently listening to the port ${port} ...`));    //app.listen will start the server. 
//sasdflkjasdfl;kj

/* Note: -------------------
* :id is how we define the variable in the URL
   it could be anything like  :var :x 
* req.params is the parameters that is inside the URL, so if we enter the api end point as /api/v1/tours/10, then the value 10 will be assigned to the id variable in the endpoint that we mentioned 
  as :id
* we can also receive multiple parameters for the end point like api/v1/tours/5/10/12/13 and we can receive them to the respective vairable by designing the end point like below. 
/api/v1/tours/:id/:x/:y/:z  each values will be assigned to each of these variable one by one. 
  While doing this the number of params in the url and in the end point should match. Otherwise it won't hit the same end point that we wanted and may result in an error 

const id = req.params.id * 1 ; // to covert the data from string to a number. // Data base trick. 
find() is the function like map but will only return one element that matches to the data inside the array. 

* if(!tour) will return the error if the data is not in the array. 