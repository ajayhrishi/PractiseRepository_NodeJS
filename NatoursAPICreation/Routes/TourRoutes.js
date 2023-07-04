
const express = require('express');
const tourContollers = require('../Controller/tourController');

const tourRouter = express.Router();


// tourRouter.param('id',(req,res,next,val)=>{   // We don't need this becuase now we are using the MongoDB it will be replacing this functionality. 
//     console.log('this is from middleware that only excutes when there is a id parameter');
//     next();
// });


tourRouter.route('/').get(tourContollers.getAllTours).post(tourContollers.addTour);
tourRouter.route('/:id').get(tourContollers.getTourByID).patch(tourContollers.updateTour).delete(tourContollers.deleteTour);
tourRouter.route('/test').post(tourContollers.TestAddTour);
module.exports = tourRouter;