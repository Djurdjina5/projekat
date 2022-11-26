const express = require("express");
const router = express.Router();
const dbo = require("../db.js");
const mongoose = require("mongoose");
const bookController = require("../controllers/booksController");
const Book = mongoose.model("book");
const path=require("path");
const fs = require("fs");
var multer=require("multer");
const storage= multer.diskStorage({
    destination:function(req,file,cb)
    {
      cb(null,__dirname+'/uploads');
  
    },
    filename:function(req,file,cb)
    {
        if(file){
      cb(null,Date.now()+path.basename(file.originalname,'.JPG')+path.extname(file.originalname));
        }
    }
  });
  
  const fileFilter=  function(req,file,cb){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
      cb(null,true);
    }
    else {
      cb(null,false);
  
    }
  }

var upload = multer({storage:storage,fileFilter:fileFilter})
router.post('/storeBook',upload.single('slika'), function (req, res, next) {
    
    var book = new Book();
    book.title = req.body.title;
    console.log(req.body)
    book.publishedYear = req.body.publishedYear;
    book.authors = req.body.authors;
    book.categor = req.body.category;
    book.description = req.body.description;
    book.numberOfPages= req.body.numberOfPages;
    book.picturePath = "http://localhost:5000/routes/uploads/" + req.file.filename;
    console.log(book);
             
    // if(req.file) { book.picturePath = path.basename(req.file.filename)} else {korisnik.slika=path.join(__dirname,'uploads/default.png') ;}
    book.save((err,doc)=>{
        console.log(doc);

        if(doc) res.json("Knjiga je uspesno sacuvana!");
        if(err) res.status(404).json("Knjiga neuspesno sacuvana!");
     });
  
});

router.get('/getFreeBooks',bookController.getFreeBooks);
router.get('/getBooks',bookController.getBooks);
router.post('/loanBook',bookController.loanBook);
router.post('/returnBook',bookController.returnBook);

module.exports = router;
