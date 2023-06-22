
const { error } = require('console');
const pick = require(`./PromiseTestings/dogName.js`); // as of now, i am using it only to trigger the dogName.js file that is inside the PromiseTestings folder. if needed I can access the name of the dog by entering. pick.module.
const fs = require('fs');
const superagent = require('superagent');

let name;
const fileReaderSync = () =>{
    fs.readFile('./PromiseTestings/dog.txt',(err,data)=>{
    name = data.toString();
    superagent.get(`https://dog.ceo/api/breed/${name}/images/random`).then(res=>{console.log(res.body.message)
    fs.writeFile('./PromiseTestings/Link.txt',res.body.message,err=>{return console.log(err);})}).catch(err=>{if(err)return console.log(err)});
    });
    
}

fileReaderSync();


