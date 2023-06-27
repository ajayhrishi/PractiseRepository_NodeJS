const pick = require(`./components/dogName.js`); // as of now, i am using it only to trigger the dogName.js file that is inside the PromiseTestings folder. if needed I can access the name of the dog by entering. pick.module.
const fs = require('fs');
const superagent = require('superagent');

function FileReadPromise(url){ //Making Promise to ReadFiles.
    return new Promise ((resolve,reject)=>{
    fs.readFile(url,(err,data)=>{ // will read the dog name that is stored inside the dog.txt file inside the PromiseTesting folder.
    console.log('type of the Data from the read file is ',typeof data, ' it need to be changed to string format to add it with our Api calls.'); // checking the dataType of the readed data.
    if(err) reject(err.body.message);
    resolve(data);
    
    })  // closing of ReadFile function                                   
}); // closing of promise
                        }//Closing of FileReadPromise()

function WriteLinkToTxt(url){
        console.log('WriteLinkToTxt function triggered with URL, ', url);
        return new Promise((resolve,reject)=>{
        fs.writeFile('./Link.txt',url,err=>{
        if(err)reject('Not able to write the Link to the Link.txt file')
        resolve(url);
        })// end of the WriteLinkToTxt function.
    })// Closing of the promise.
}// Closing of the  WriteFile function.


async function ProcessNow(){
    try{
        
    const data = await FileReadPromise('./dog.txt'); // Stopping the code until we finish reading the file. 
    console.log('Data got from dog.txt file is', data, ' and its type is ', typeof data);
    const UpdatedData = await data.toString();// .toSting() is a call back function in use, if we don't use await here, before the value is even getting converted the code will move to the next line. 
    console.log('Data read from the file convered to ',typeof UpdatedData );
    console.log('Requesting the URL from the api now...');
    const apiURL = await superagent.get(`https://dog.ceo/api/breed/${UpdatedData}/images/random`); // stoping the code until we get the response from the api
    console.log('Url got from the api is ',apiURL.body.message);
    await WriteLinkToTxt(apiURL.body.message); // just pausing the code until the promise is resolved. 
    console.log(apiURL.body.message,' is written to the Link.txt file that is inside the PromiseTestings folder')
}catch(err){
    throw(err)
    // replacement for the .catch() at the end of the promise chain    
}
}

ProcessNow().catch(err=>console.log(err));






