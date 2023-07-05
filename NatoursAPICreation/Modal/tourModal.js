const mongoose = require('mongoose');

const tourSchima = new mongoose.Schema({
    rating: {type:Number, default:4.5},
    images: {type: [String]},
    startDates: {type:[String]},
    name: {	type: String,
            required: [true,'Must need a Name for the tour'],
            unique: true
        },
    duration: {type :Number, 
               required: [true, 'The Tour Must have an end']  
    },

    maxGroupSize: {type: Number, 
                   required: [true, 'Number of occupancy is mandatory']               
    },

  difficulty: {type:String,
                required:[true, 'Difficulty Level is mandatory']},

   guides: { type: [String],
             required:[true, 'Tour Guide details are missing' ],},

    price: {
      type:Number,
      required: [true, 'Must need a valid price for the tour'],
  },

  priceDiscount: Number, 
    summary:{type: String, 
             required: [true, 'Missing Summary'],
            },
    description : {
      type: String, 
      required:[true, 'Missing duration']
    },
    imageCover:{type:String},
    locations: {type:[String]},
    CreatedDate: {
      type:Date,
      default:Date.now()
    }
    //
});

const Tour = mongoose.model('Tour',tourSchima); // Here we are creating a model with the tourSchima sepsifications. we can consider it like a set of data with the same properties. 
module.exports = Tour;
/*

1. 
  exports.TestAddTour= (req,res) =>{

    const TestTour = new Tour( {
      name:"Testing Add  Tour with MongoDB 2nd Attempt",
      rating: 4.5,
      price: 600,
      description: "This is for testing purpose. "
    });

    TestTour.save().then(doc=>{console.log('Add Tour to the mongoDB with the Tour Model is successful'); console.log('Data Received: ',doc); return res.status(200).send('update Completed');}).
    catch(err=>{console.log('Data Saving to the MongoDB failed.');console.log("Error: ",err); return res.status(500).send('Could Not update');});
  }
2. Another way of adding the contents to the Tour model is by doing like below. 
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

3. To get all the details in the Tour you can do like below. 

*/
