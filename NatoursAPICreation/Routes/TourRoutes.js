
const express = require('express');
const tourContollers = require('../Controller/tourController');

const tourRouter = express.Router();

tourRouter.route('/').get(tourContollers.getAllTours).post(tourContollers.addTour);
tourRouter.route('/:id').get(tourContollers.getTourByID).patch(tourContollers.updateTour).delete(tourContollers.deleteTour);

module.exports = tourRouter;