require('dotenv').config();
require('./connect');
const  mongoose =require('mongoose');
const express=require('express');
const app=express();
const cors = require("cors");
const bodyparser = require("body-parser");
const path =require('path');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'assest')));



