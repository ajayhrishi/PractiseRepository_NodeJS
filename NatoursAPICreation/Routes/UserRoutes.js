const express = require('express');
const userRouter = express.Router();

//------------- User EndPoints Functions. 

// ---------------------------

/* Note
* const app = express();
* app.use(express.json());
The express module is imported and assigned to the express variable using the require function.
Then, the express() function is called, which creates a new Express application object.  This object is assigned to the app variable, allowing you to configure and use the Express application. 
express.json is the middleware that we are using to send response in the json formate. using the .use() we are adding this middleware to the app express object's middlewarestack
* let tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
Line to load up all the tours and store them as JSON objects ready to send when the API call happens.
When we ready the data from the tours-simple.json it won't be as the JSON objects. to fix it we are using the JSON.parse
* async function ReadFilePromise(url){ // Promise Creation function for Reading file
*/
const userContollers = require('../Controller/userController');

userRouter.route('/:id').get(userContollers.getUser).patch(userContollers.updateUser).delete(userContollers.deleteUser);
userRouter.route('/').get(userContollers.getAllUsers).put(userContollers.AddUser);

module.exports = userRouter;