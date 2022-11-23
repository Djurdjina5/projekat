const mongoose = require("mongoose");
const e = require("express");
const { json } = require("express");
const Book = mongoose.model('book');

module.exports.getBooks = function(req,res)
{

  Book.find({isLoaned:true},function(err, books){
    if(err) return handleError(err);
    else {
      res.status(200).json(books);
    }


  })


}

module.exports.getFreeBooks = function(req,res)
{

  Book.find({loanedUser:null},function(err, books){
    if(err) return handleError(err);
    else {
      res.status(200).json(books);
    }


  })


}
