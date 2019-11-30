var express = require("express");
var router = express.Router();
var userapi = require("./userapi")
// var multer  = require('multer')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname + '-' + Date.now())
//     }
//   })
   
//   var upload = multer({ storage: storage })
  

router.get('/',(req,res)=>{
    res.render('homepage');
})

router.get('/login',(req,res)=>{
    res.render('loginForm');
})

// router.get('/adduser',(req,res)=>{
//     res.render('register');
// })

router.post('/adduser', async function(req,res){
    try{
        console.log("req.body",req.body)
    var result = await userapi.Adduser(req.body);
    res.send(result);
    }
    catch(err){
        res.send(err);
    }
})

// router.post("/imageupload",upload.single("imageupload"),async(req,res)=>{
// console.log("file in the back end",req.file);
// console.log("req.body",req.body);





// })




router.get('/verify/:email', async function(req, res){

    try{
        console.log(req.params.email)
    var result = await userapi.verifyUser(req.params.email);
    res.send(result);
    }

    catch(err){
        res.send(err);
    }

})

// router.post('/userdata', async function(req, res){
//     try{
//         var result = await userapi.userData();
//         res.send(result);
//     }
//     catch(err){
//         res.send(err);
//     }
// }
// )

router.post('/login', async function(req, res){
    try{
        console.log("req.body",JSON.stringify(req.body))
        var result = await userapi.loginuser(req.body);
        res.send(result);
    }
    catch(err){
        res.send(err);
    }
 })





module.exports = router;









