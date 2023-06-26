const express = require('express'); // all the express features will be added to the express. 
const app = express();  // express function will add all the features to the app variable. 
const fs = require('fs');
const port = 3000; // to decided which port we need to use. 

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)); // Line to load up all the tours and store them as JSON objects ready to send when the API call happens. 
                // When we ready the data from the tours-simple.json it won't be as the JSON objects. to fix it we are using the JSON.parse

async function ReadFilePromise(url){  // Promise Creation function for Reading file
    const ReadedPromise = await new Promise((resolve, reject)=>{fs.readFile(url,(res,err)=>{
        if(err) reject(err);
        resolve(res);
    })});
    return ReadedPromise;
}
app.get('/api/v1/tours',(req,res)=>{ // '/api/v1/tours is not mandatory, we can just add like /tours. but by following the current end point it is more readable and organised. 
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours //same as "tours":tours // tours is the variable that we used to store the readed data from the file tours-simple.json
        }
    })
})

// app.get('/',(req,res)=>{
//     res.status(200) // will. create the header with the status of 200. // status() is what help us to create the header. res.status().json() is an example of methoad chaining in JS. 
//                     // we can also change it to status of 404, in that case it will send the repsponse back and if the user will be able to see the failed to load 404 console.error on thier browser. 
//     .json({name:'Ajay HRishi V', age: '23'}); // will send the jason object as data. 
//    // if we just want to set a string, then can use .send('String Content');
//    // we can also write it in two lines like res.status(200); and res.json(data); the current fomate will help to reduce the number of lines. 
// });
// app.post('/', (req,res)=>{
// res.status(200).send('You have reached the postingEndpoint, you can post you datas here. ');
// });

app.listen(port,console.log(`The app is currently listening to the port ${port} ...`));    //app.listen will start the server. 
