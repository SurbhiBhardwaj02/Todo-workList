const express= require("express");
require('dotenv').config();

const bodyParser= require("body-parser");

const methodOverride= require("method-override");
const {userModel,userWorkModel}= require("./database")

//const userWorkModel = require("./database");
const date= require(__dirname+ "/date.js");

const app= express();
app.use(methodOverride("_method"))

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/home", async(req,res)=>{
    
    
    let day = date.getDate();
    const data=await userModel.find({})
                 
    res.render("list", {
        listTitle: day,
        newAddedItems : data
    });
});

app.post("/home", async (req,res)=>{

    let item = req.body.newItem;
    const obj = new userModel({
        name: item,
    }); 
    await obj.save();
    res.redirect("/home"); 
})

app.get("/work", async function(req,res){
    
        const content=await userWorkModel.find({})
        
        res.render("list",{
            listTitle: "Work List",
            newAddedItems:content
        }) 
})

app.post("/work", async function(req,res){
    const item = req.body.newItem;

    const obj = new userWorkModel({
        name:item
    });
    await obj.save()
    
    res.redirect("/work");
    
})

app.get("/", (req,res)=>{
    res.render("about");
})

app.delete("/home/:id",async (req,res)=>{
    const {id} =req.params;
    
        await userModel.deleteOne({_id:id})
        res.redirect("/home")
        
})
app.delete("/work/:id", async (req,res)=>{
    let {id}=req.params;
    await userWorkModel.deleteOne({_id:id})
        
    res.redirect("/work") 
})

app.listen(3100, ()=>{
    console.log("Server is running on 3100");
})  
