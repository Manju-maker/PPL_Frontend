var userapi = require("./mongooseSchema");

var SGmail = require("@sendgrid/mail");
SGmail.setApiKey("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")

module.exports = {


// userData:function(){
//     return new Promise((resole,reject)=>{
//         userapi.find({}),function(err,result){
//             resolve(result);
//         }
//     })
// },

Adduser:function(data){
    return new Promise((resolve,reject)=>{


userapi.find({"email":data["email"]},function(err,result){
    if(result.length>0){
        resolve("email already exist");
    }
    else{
        userapi.create(data, function(err,result){
            if(result){
                const msg = {
                    to: data["email"],
                    from: "bhattmanju46@gmail.com",
                    subject: "Sending with Twilio SendGrid is Fun",
                    text: "Registered Successfully",
                    html: "You're on your way!<br>Let's confirm your email addressBy clicking on the following link, you are confirming your email address<br> http://localhost:8081/verify/"+result["id"]
                    };
                    SGmail.send(msg);
                    resolve("registered Successfully, Please confirm your email id");
            }  
            if(err){
                reject(err);
            }
           
            
                })
            }
            if(err){
                rejecct(err);
            }
            
        })
            })
        },

verifyUser:function(data){
    return new Promise((resolve, reject)=>{
    
            userapi.updateOne({"_id":data},{$set:{verify:true}},function(err,result){
                
                if(result){
                   console.log(result)
                    resolve("Verified Successfully");
                }
                else{
                    resolve("Not verified");
                   
                }
                if(err){
                    reject(err);

                    console.log(err);
                }
               
            });
            
        })
    
},
loginuser:function(logdata){
        console.log("data--",logdata)
        return new Promise((resolve,reject)=>{
    
    
            userapi.find({email:logdata["email"],"pass":logdata["pass"]}, function(err,result){
    
    
                if(result.length>0){
                  console.log("result-+++-passowrd and email correct",result)
                userapi.find({email:logdata["email"],verify:true},{"_id":1},function(err,result){
                    if(result.length>0){
                        console.log(result);
                        resolve(result);
                        //resolve("Login Successfully");
                   
                    }
                    else{
                        resolve("Verify your email id first");
                    }
                    if(err){
                        reject(err);
                    }
                 });
              }
              else if(err){
                reject(err);
            }
              else{
                  console.log("credentials wrong")
                  resolve("Invalid Username or Password");
                  
              }
              
            })
    
        })
    }
    }
    
    

