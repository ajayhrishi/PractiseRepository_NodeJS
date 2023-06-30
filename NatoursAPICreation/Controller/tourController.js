
const fs = require('fs');
let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)); 

async function ReadFilePromise(url){  // Promise Creation function for Reading file
    const ReadedPromise = await new Promise((resolve, reject)=>{fs.readFile(url,(res,err)=>{
        if(err) reject(err);
        resolve(res);
    })});
    return ReadedPromise;
}
//--------------- End point function to get all the tours. ----------- 
exports.getAllTours = (req,res) =>{
    res.status(200).json({      
      status: 'success',
      results: tours.length,
      data: {
          tours 
      }
  });
  }
  /*Note
  app.get('/api/v1/tours',(req,res)=>{ // '/api/v1/tours is not mandatory, we can just add like /tours. but by following the current end point it is more readable and organised. 
  tours //same as "tours":tours // tours is the variable that we used to store the readed data from the file tours-simple.json
  */
  
  // ------------------- End point function to post one extra tour to the existing list. 
  exports.addTour = (req,res) =>{
    //   console.log('post reqest received');
    //   console.log('data in the body is ',req.body);
      const newId = tours[tours.length - 1].id+1; // will create an new id based on the last element's id in the tours object array. 
    //   console.log('new Id created: ',newId );
      const newTour = Object.assign({id:newId},req.body);   // Object.assign will make a new object with the newId we created. 
    //   console.log('new object created :',newTour);
      tours.push(newTour); // add the newly created Object to the current tours. 
    //   console.log('added the tour to the tours variable array');
    //   console.log('Current value of the tours array: ',tours);
  
      fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, `[${tours.map(tour => JSON.stringify(tour)).join(', \n')}]`, err => {
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
  }
  /* Note: ---------------
  Even though the req do have all the data send by the user, we will not be able to directly access it. To access that data we use the middleware. 
  Middleware is a function that can modify the incoming data. 
  console.log(req.body);
  Not using the writeFileSync becuase the code is inside a call back function. 
  */
  
  // --------------------------- End point to get the tour with a spesific ID
exports.getTourByID = (req,res) =>{
    // console.log('the id based end API GET point in the app.js file is called')
    // console.log(req.params, ' is the ID in the API is called.');
    const id = req.params.id * 1 ;
    const tour = tours.find(el=> el.id === id);
    //if(id >tours.length) {
      if(!tour) {
      return res.status(404).json({
        status: 'Fail',
        message: 'File not found'
      })
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  }
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
  
  // --------------------------- EndPoint to delete a spesific tour request.
  
exports.deleteTour = (req,res) =>{
    // console.log('id passed down to delete: ',req.params.id);
    // console.log('Length of the total tours', tours.length);
    if(tours.length<req.params.id||req.params.id<0){
      return res.status(404).json({status:'Failed', data:null});
    }
    res.status(204).json({
    status:"Success",
    data: null
    });
    
  }
    /**
     Note: 
     * 204 is the status code we use for common delete processed HTTP requests.
     res.status(204) .json content will not be returned to the only the code 204 will be send back to the client. 
     */
  
  // --------------------------- EndPoint function to process the patch requests. 
 exports.updateTour = (req,res) =>{
    // console.log('tours.length: ',tours.length);
    // console.log('id passed in', req.params.id*1);
    if(tours.length<req.params.id||req.params.id<0){
      return res.status(404).json({
        status: 'failed',
        data:"ID not found in the list to udpate"
      });
    }
    // console.log('tours.length: ',tours.length);
    // console.log('id passed in', req.params.id*1);
    
    res.status(201).send('Update In process'); 
  }     
  
  