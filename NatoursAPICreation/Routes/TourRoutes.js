
const express = require('express');
const tourContollers = require('../Controller/tourController');

const tourRouter = express.Router();


// tourRouter.param('id',(req,res,next,val)=>{   // We don't need this becuase now we are using the MongoDB it will be replacing this functionality. 
//     console.log('this is from middleware that only excutes when there is a id parameter');
//     next();
// });


tourRouter.route('/busy_month/:year').get(tourContollers.getBusyMonth);
tourRouter.route('/stats').get(tourContollers.getTourStats);
tourRouter.route('/bestTour').get(tourContollers.TopTourFetchMiddleWare,tourContollers.getAllTours);
tourRouter.route('/').get(tourContollers.getAllTours).post(tourContollers.addTour);
tourRouter.route('/:id').get(tourContollers.getTourByID).patch(tourContollers.updateTour).delete(tourContollers.deleteTour);
module.exports = tourRouter;

