var express = require("express");
var router = express.Router();
var userapi = require("../Api/userapi");

router.post("/adduser", async function(req, res) {
    try {
        var result = await userapi.Adduser(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.get("/verify/:email", async function(req, res) {
    try {
        var result = await userapi.verifyUser(req.params.email);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/login", async function(req, res) {
    try {
        var result = await userapi.loginuser(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.get("/verifyLink/:email", async function(req, res) {
    try {
        var result = await userapi.verifyPassLink(req.params.email);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/forgotPass", async function(req, res) {
    try {
        var result = await userapi.forgot(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.post("/resetPass", async function(req, res) {
    try {
        console.log("Password console", req.body);
        var result = await userapi.resetPassword(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
