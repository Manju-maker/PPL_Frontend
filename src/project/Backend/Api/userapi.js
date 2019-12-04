var userapi = require("../Schema/userSchema");

var SGmail = require("@sendgrid/mail");
SGmail.setApiKey("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")

module.exports = {


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
                  // console.log(result)
                    resolve("Verified Successfully");
                }
                else{
                    resolve("Not verified");
                   
                }
                if(err){
                    reject(err);

                   // console.log(err);
                }
               
            });
            
        })
    
},

verifyPassLink: function(data){
return new Promise((resolve,reject)=>{
    userapi.updateOne({"_id":data},{$set:{forgot:true}},function(err,result){
        if(result){
            resolve("Re enter your password")
        }
        else{
            reject(err);
        }
    })
})
},

loginuser:function(logdata){
       // console.log("data--",logdata)
        return new Promise((resolve,reject)=>{
    
    
            userapi.find({email:logdata["email"],"pass":logdata["pass"]}, function(err,result){
    
    
                if(result.length>0){
                  //console.log("result-+++-passowrd and email correct",result)
                userapi.find({email:logdata["email"],verify:true},{"_id":1},function(err,result){
                    if(result.length>0){
                      //  console.log(result);
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
                 // console.log("credentials wrong")
                  resolve("Invalid Username or Password");
                  
              }
              
            })
    
        })
    },


resetPassword: function(data){
    console.log("Id",data)
 return new Promise((resolve,reject)=>{
     userapi.updateOne({"_id":data.id},{$set:{pass:data.pass}},function(err,result){
         if(result.lenght>0){
             console.log(result);
             console.log("Password updated")

         }
         else{
             console.log(err);
             reject(err);
         }
     })
 })
},
forgot:function(data){
    //console.log(data)
    return new Promise((resolve,reject)=>{
        userapi.find({"email":data.email},function(err, result){
            if(result.length>0){
                   
                userapi.updateOne({"email":data.email},{$set:{forgot:true}},function(err,result){
                    if(result){
                        userapi.find({"email":data.email},function(err, result1){
                            if(result1){
                                console.log("result1",result1);
                                resolve(result1)
                            }
                            else{
                                reject(err);
                            }
                        })
                    }
                    else{
                        reject(err);
                    }
                })

          
            }
            else if(err){
                reject(err);
            }
            else{
                console.log("Email not registered")
                resolve("Email not Registered")
            }
        })

       
    })
}


// forgot:function(data){
//     console.log(data.email)
//     return new Promise((resolve,reject)=>{
//         userapi.findOne({"email":data.email},function(err,result){
//             if(result){
                
//                 console.log(result)
//                 const msgs = {
//                     to: data["email"],
//                     from: "bhattmanju46@gmail.com",
//                     subject: "Sending with Twilio SendGrid is Fun",
//                     text: "Link sent",
//                     html: "Click on the link to reset your password <br> http://localhost:8081/verifyLink/"+result["id"]
//                     };
//                     SGmail.send(msgs);
//                     resolve(result);
                   
//             }
//             else if(err){
//                 console.log("Err",err)
//                 reject(err);
//             }
//             else{
//                 console.log("Not registered")
//                 resolve("email not registered");
//             }
//         })

//     })
// }
}
    
    

