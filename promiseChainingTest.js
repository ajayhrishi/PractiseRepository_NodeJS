const pick = require(`./PromiseTestings/dogName.js`); // as of now, i am using it only to trigger the dogName.js file that is inside the PromiseTestings folder. if needed I can access the name of the dog by entering. pick.module.
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
        fs.writeFile('./PromiseTestings/Link.txt',url,err=>{
        if(err)reject('Not able to write the Link to the Link.txt file')
        resolve(url);
        })// end of the WriteLinkToTxt function.
    })// Closing of the promise.
}// Closing of the  WriteFile function.


FileReadPromise('./PromiseTestings/dog.txt').then(data=>{return data.toString()}) // Testing the promise Chaining
.then(data =>{return superagent.get(`https://dog.ceo/api/breed/${data.toString()}/images/random`)})
.then(data=>{console.log(data.body.message); return data.body.message})
.then(data=>{WriteLinkToTxt(data); return data})
.then(data=> console.log(data,' is written to the Link.txt file that is inside the PromiseTestings folder'))
.catch(err=>console.log(err));






