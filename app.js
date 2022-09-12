const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());

// schema..

const productSchema = mongoose.Schema({
  name:{
    type:String,
    required: [true,"please provide a name for this product"],
    trim: true,
    unique:true,
    minLenght:[3,"name must be at last 3 letter"],
    maxLenght:[100,"name must be lass than 100 letter"]
  },
  description:{
    type:String,
    required:true

  },
  price:{
    type:Number,
    required:true,
    min:[0,"price can't be negative"]

  },
  unti:{
    type:String,
    required:true,
    enum:{
      value:["kg,liter,pcs"],
      message:"unit should kg or liter or pcs"
    }
  },
  quantity:{
    type:Number,
    required:true,
    min:[0,"quantity can't be negative"],
    validate:{
      validator:(value)=>{
        const isInteger = Number.isInteger(value);
        if(isInteger){
          return true;
        }else{
          return false
        }
      }
    },
    message:"hgfhgfhg"
  },
  stauts:{
    type:String,
    enum:{
      value:["in-stock","out-of-stock","discontinued"],
      message:"erroe"
    }


  }


})

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
