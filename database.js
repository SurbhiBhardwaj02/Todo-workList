const mongoose= require("mongoose");

const db_link = process.env.DB_URL;

mongoose.connect(db_link,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(function(){
    console.log("db connected");
}) 
.catch(function(err){
    console.log(err);
});
const schema=mongoose.Schema({
    name:{
        type:String
    }
})
const Workschema=mongoose.Schema({
    name:{
        type:String      
    }
})
const userWorkModel= mongoose.model('Workschema', Workschema);
const userModel = mongoose.model('schema',schema);


module.exports ={
    userModel,
    userWorkModel
}
