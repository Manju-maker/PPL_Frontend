var express = require("express");
var router = express.Router();
var imageApi = require("../Api/imageApi");
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

router.post("/imageupload", upload.single("imageupload"), async (req, res) => {
    try {
        const imageData = {
            email: req.body.email,
            cat: req.body.cat,
            imageupload: req.file.filename,
            path: req.file.path,
            userId: req.body.userId
        };
        var result = await imageApi.ImageUpload(imageData);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/getCategories", async function(req, res) {
    try {
        console.log("req.body", req.body);
        var result = await imageApi.Categories(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/getAllPost", async function(req, res) {
    try {
        var result = await imageApi.AllPosts(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/uploadComment", async function(req, res) {
    try {
        const commentData = {
            comment: req.body.comment,
            id: req.body.Category[0]._id
        };
        var result = await imageApi.Comment(commentData);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/imageData", async function(req, res) {
    try {
        //console.log("Comment Data",commentData)
        var result = await imageApi.ImageData(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/mostCommented", async function(req, res) {
    try {
        // console.log("req.body===",req.body)
        var result = await imageApi.MostCommented(req.body);
        res.send(result);
    } catch (err) {
        console.log("error", err);
        res.send(err);
    }
});
module.exports = router;
