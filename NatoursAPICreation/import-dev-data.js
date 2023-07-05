// Page with terminal tools to data from the json file and upload to the MongoDB server collections. 

const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require(`./Modal/tourModal`);


dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useFindAndModify: false,
}).then(()=> console.log('DB connection succesful!')).catch(err=>{console.log(err)});

// Read JSON File 

const tours = JSON.parse(fs.readFileSync(`./tours-simple.json`, 'utf-8'));

  // 
// Import Data Into DB

const importData = async() => {
try{ 
	console.log(tours);
	await Tour.create(tours);
	process.exit();
 }catch(err){ 
	console.log(err);
 }
}

// Delete All Data from the DataBase

const deleteData = async() => {
try{
 await Tour.deleteMany();
 console.log('Deleted all the content in the MongoDB Collection');
 process.exit();
}catch(err){
console.log(err);
}
}

console.log(process.argv);	

if(process.argv[2]=="--import"){
	importData();
	}
	if(process.argv[2]=="--delete"){
	deleteData();
	}

/* 

the process.argv will print out the below details in the console. 

[
  'C:\\Program Files\\nodejs\\node.exe',
  'H:\\Studies\\Software Engineer\\Git-Repositories\\NodeJS\\Testing _NodeJS\\NatoursAPICreation\\import-dev-data.js'
]

these two links above are the arguments that is running this node process.

the place where the node commands are located is in here. 'C:\\Program Files\\nodejs\\node.exe',

*/

