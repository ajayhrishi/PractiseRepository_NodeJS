const mongoose = require('mongoose');

const tourSchima = new mongoose.Schema({
    name: {	type: String,
        required: [true,'Must need a Name for the tour'],
        unique: true
        }
    ,
    rating: Number,
    price: {
        type:Number,
        required: [true, 'Must need a valid price for the tour'],
    },
    description : String
});

const Tour = mongoose.model('Tour',tourSchima); // Here we are creating a model with the tourSchima sepsifications. we can consider it like a set of data with the same properties. 
module.exports = Tour;
/*there is two ways to add the content to the Tours Model. One is 
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
