const fs = require('fs');
const Tour = require('./../Modal/tourModal');
const { request } = require('http');
const { param } = require('../app');
const APIFeatures = require('../Features/APIFeatures')


exports.TopTourFetchMiddleWare = (req,res,next)=>{
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,rating, summary, difficulty';
  next();
} // middleware function with seperate route for fetching the top tours

//--------------- End point function to get all the tours. ----------- 
exports.getAllTours = async (req,res) =>{
    try{
      const decidedTours = new APIFeatures(Tour.find(), req.query).filter().sort().fields().page();
      const tours = await decidedTours.query;

res.status(200).json({
      status: "success",
      length: tours.length,
      tours
    });
  }
  catch(err){
    console.log(err);
    res.status(404).json({
      status: "failed",
      Message: "Unable Get all the Tour details. ",
      data: 
        err
    });
  }
  }
  
  // ------------------- End point function to post one extra tour to the existing list. 
  exports.addTour = async (req,res) =>{  // added async becuase we will be processing the data based on the data contained inside the API request to the MongoDB
    try{
    const newTour = await Tour.create(req.body);
        res.status(201).json({
          status: "success",
          data:{
            tour: newTour
          }
    });
  }
  catch(err){
    res.status(404).json({
      status: "Failed",
      data: {
        err
      }
    });
  }
}
  // --------------------------- End point to get the tour with a spesific ID
exports.getTourByID = async (req,res) =>{
    try{
      const TheTour = await Tour.findById(req.params.id);
      res.status(200).json({
        status: "Success",
        data: TheTour
      });
   }catch(err){
    res.status(404).json({
      status: "Failed",
      message: "Could not find any data with that ID",
      data: err
    });
   }
}
  /* Note: -------------------
  *findById is the function that help us to get the data with the spesific ID from the Modal 
  instead of this you can also use the code like below 
  const TheTour = await Tour.findOne({_id: req.params.id});

  */
  // --------------------------- EndPoint to delete a spesific tour request. // using the findByIdAndDelete()
  
exports.deleteTour = async (req,res) =>{
  try{
   await Tour.findByIdAndDelete(req.params.id,{});
   res.status(204).json({
    status: "Sucess",
    data: null
   });
  }catch(err){
    res.status(404).json({
      status:"Failed",
      data: null
    })
  }
  }
    /**
     Note: 
     * 204 is the status code we use for common delete processed HTTP requests.
     res.status(204) .json content will not be returned to the only the code 204 will be send back to the client. 
     */
  // --------------------------- EndPoint function to process the patch requests.  // using the findByIDAndUpdate
 exports.updateTour = async (req,res) =>{
   try{
    // console.log('Id received by the updateTourFunction is: ',req.params.id);
    // console.log('request body is : ',req.body);
    const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new: true,
      runValidators: true
    });
    res.status(201).json({
      status: "Success",
      data:tour
    });
   }catch(err){
    res.status(404).json({
      status:"Failed",
      err
    })
   }
  }     
  


exports.getTourStats = async(req, res) =>{
  try{
  const stats = await Tour.aggregate([
  { 
    $match: { rating: {$gte: 4.5}} 
  },
  {
    $group: {
      _id: '$difficulty', 
      numTours : {$sum: 1},
      numRatings : {$sum: '$ratingsQuantity'},
      avgPrice: {$avg: '$price'},
      minPrice: {$min: '$price'},
      maxPrice: {$max: '$price'} }
    }
  ]);

  console.log(stats);
  res.status(200).json({status: "Success",
  data: {stats}
})

}catch(err){
  res.status(404).json({
  status: "Failed",
  message: err
  })
  }
  }

exports.getBusyMonth = async(req, res) =>{
    try{
    const year = req.params.year *1;
    console.log(year);
    const plan = await Tour.aggregate(
  
    [
      {$unwind: '$startDates'},

  {
    $match: {
	  startDates: {
		$gte: new Date(`${year}-01-01`),
		$lte: new Date(`${year}-12-31`),
		}
	}
  },

  { 
	 $group: {
	 _id: {$month: '$startDates'},
	 numToursStart: {$sum:1}	
  }
	
  }
    ]
  
    );
  
    console.log(plan);
    res.status(200).json({status: "Success",
    data: {plan}
  })
  
  }catch(err){
    res.status(404).json({
    status: "Failed",
    message: err
    })
    }
    }