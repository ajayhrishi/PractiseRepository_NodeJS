
const express = require('express');
const tourContollers = require('../Controller/tourController');

const tourRouter = express.Router();


tourRouter.param('id',(req,res,next,val)=>{
    console.log('this is from middleware that only excutes when there is a id parameter');
    next();
})

tourRouter.route('/').get(tourContollers.getAllTours).post(tourContollers.addTour);
tourRouter.route('/:id').get(tourContollers.getTourByID).patch(tourContollers.updateTour).delete(tourContollers.deleteTour);

module.exports = tourRouter;