


// testing the call back and file access system in node js, example with call back hell. 
const { error } = require('console');
const fs = require('fs');
const value = fs.readFileSync('./text.txt', 'utf-8');
const textOut = '\n\n-------------------------- This is the content: --------------------------------\n\n'+ value;
fs.writeFileSync('./out.txt',textOut);

const invalue = fs.readFileSync('./1-node-farm/starter/txt/start.txt','utf-8');

fs.readFile('./text.txt','utf-8',(error,data)=>{
    
    fs.readFile('./1-node-farm/starter/txt/start.txt','utf-8',(error,data)=>{
      
      fs.readFile('./1-node-farm/starter/txt/final.txt', 'utf-8', (error,data)=>{
        
        fs.readFile('./1-node-farm/starter/txt/input.txt', 'utf-8', (error,data)=>{
            
            fs.readFile('./1-node-farm/starter/txt/read-this.txt','utf-8', (error,data)=>{
                console.log('read-this.txt file readed successfully');
            });
            console.log('input.txt file readed successfully');
        });
        console.log('final.txt file readed successfully');
      });
      console.log('start.txt file readed successfully');
    });
    console.log('/text.txt file is read correctly');
});


