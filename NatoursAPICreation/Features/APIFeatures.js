
class APIFeatures {
    constructor(query, queryString){  // when we make the object we are passing the values (Tour.find(), req.query) Tour.find() has all the tours, req.query has query string from the client. 
        this.query = query, // assigining to respective variables to class objects for future operations. 
        this.queryString = queryString // assigining to respective variables to class objects for future operations. 
    }
    filter(){ // place to convert the filter the details.
        const queryObj = {...this.queryString};   // taking all the elements inside the queryString which is the same as req.query. 
        const excludedFields = ['page','sort','limit','fields']; // making an array of keynames we don't want to use while do the filter.
        excludedFields.forEach(el=>delete queryObj[el]); // takng each elements from the list of unwanted array list and deleting it from the queryObj which is the same as req.query 
        let queryStr = JSON.stringify(queryObj); // unwanted elements in filter is removed and now converting it to a string to add the $sign informt of each(mongoDB operator sign)
        queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`); // replacing with the $sign
        this.query = this.query.find(JSON.parse(queryStr)); // converting the $ sign added queryString back to an object for further operations. // find() is actually adding all the matchings to the this.query in object, in otherwords it's filtering. 
        return this; // saving the data to the object becuase otherwise the opeartions inside the block scope wont be saved before going to the next operations. 
}
    sort(){
        if(this.queryString.sort){ // checking if the queryString has a element with the keyname 'sort'
          const sortBy = this.queryString.sort.split(',').join(' '); // will select the 'sort' key value in the object then if there are multiple elements for it, split it - 
          // by removing the coma then once it's done it will assign it to the sortBy variable as a string
          this.query = query.sort(sortBy);// now the sortBy will be a string that has the propties as a string so will pass it to the mongoose .sort() property to perform the actual sort.
        }
        return this;// saving the data to the object becuase otherwise the opeartions inside the block scope wont be saved before going to the next operations. 
    }
    fields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' '); // saving the fields property as a string
            this.query = this.query.select(fields); // passing the strigfied fields property to the .select() of mongoose then saving it in the query property that belongs to the object. 
            // console.log(query);
        }
        else {
            this.query = this.query.select('-__v')
        }
        return this;// saving the data to the object becuase otherwise the opeartions inside the block scope wont be saved before going to the next operations. 
        }
    page(){
        if(this.queryString.page){
        const page = this.queryString.page*1 || 1; 
        const limit = this.queryString.limit*1 || 100;
        const skip = (page - 1)* limit; // just making the page properties. 
        this.query = this.query.skip(skip).limit(limit); 
    }
    return this;// saving the data to the object becuase otherwise the opeartions inside the block scope wont be saved before going to the next operations. 
}
    
}
/* this is how the class user should use it. after importing the above class. 
const newAPIFeature = new APIFeature(Tour.find(), req.query).filter().sort().fields().page();
const Thetours = await newAPIFeature.queryString;
*/

module.exports = APIFeatures;








/*
    //const Tours = await Tour.find().where('diffculty').equals(5).where('duration').equals('easy'); // this will work just like the above. 
   
    Other similar properties. .where('duration').lte(5) // for less that or equal, you can also use lt(largerThan) gt(greaterThan) gte(greaterThanOrEqual)
    
    const queryObj = {...req.query};

    //////////////////////////////////////////////////// Here we are doing the Filter operations ///////////////////////////////////////////////////////////

    const excludedFields = ['page','sort','limit','fields'];
    excludedFields.forEach(el=>delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);
    
    /*
    //g is the warper to select all the matching
    \b\b is the warper to only choose the indivitual matching words
    
  
    console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));
    
    // we are story it in the query variable so that we can chain more operations provided by the mongoose to this spesific variable
    
//////////////////////////////////////////////////// Here we are doing the Sorting operations ///////////////////////////////////////////////////////////
    if(req.query.sort)
    {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }
    /*
    .sort() is a mongoose operation that can be applied to the mongoDB DataBase
    if we are enetering the name 'price' manually to it then it will sort all the data in the query that is from the Tour Modal of MongoDB Testing DataBase to acceding order. 
    if we enter the '-price' then it will be in the decending order. 

    when we have multiple sort operations then we can pass in price -rating NumberOfRating as toghther to a .sort() and mongoose will take care of it. 
    but endpoint's process.argv will not process the spaces in between. So we will use the , while doing the api calls to to get it send to the server and from the server we will get it back to as 
    we want using the code 
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
    */

  //////////////////////////////////////////////////// Here we are doing the field operations ///////////////////////////////////////////////////////////
  /*
  As of now we have the filter and then sort options, but still each tour has so many information that we don't want to read from the top to bottom, to choose the one that we need, we can use the 
  field feature. 
 
  // console.log(req.query.fields);
  
  if(req.query.fields){
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
    // console.log(query);
   }else{
   query = query.select('-__v');
   }
    const tours = await query;

    // can call like below - http://127.0.0.1:3000/api/v1/tours?price[gte]=1500&price[lte]=2000&fields=name,-_id
  //////////////////////////////////////////////////// Here we are doing the Page operations ///////////////////////////////////////////////////////////
const page = req.query.page*1 || 1; 
const limit = req.query.limit*1 || 100;
const skip = (page - 1)* limit;

query = query.skip(skip).limit(limit);

if(req.query.page){
const numTours = await Tour.countDocuments();
if(skip>=numTours) throw new Error('This page does not exist');
}

*/



