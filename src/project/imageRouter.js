var express = require("express");
var router1 = express.Router();
var imageApi = require('./imageApi')
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
   
  var upload = multer({ storage: storage })


router1.post("/imageupload",upload.single("imageupload"),async(req,res)=>{
    
        try{
//console.log(req.body)
         
            const imageData={email:req.body.email,cat:req.body.cat,imageupload:req.file.filename,path:req.file.path,userId:req.body.userId}
            //console.log(imageData)
    var result = await imageApi.Upload(imageData);
    //console.log("response",result);
    res.send(result);
        }
        catch(err){
            res.send(err);

        }
});    

router1.post("/getCategories", async function(req,res){
  try{

    //console.log(req.body)
    var result = await imageApi.Categories(req.body);
    console.log("result--",result)
    res.send(result)
  }
  catch(err){
   
    res.send(err);
  }
})


  module.exports = router1;