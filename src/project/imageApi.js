var imageApi = require("./imageSchema");

module.exports={
    Upload:function(data){
        //console.log("Upload data",data.userId);
        return new Promise((resolve,reject)=>{
        imageApi.create(data,function(err,result){
            if(result){
                imageApi.find({"userId":data["userId"]},function(err,result1){
                    if(result1){
                        console.log("total images-",result1);
                        resolve(result1);
                    }
                    else{
                        console.log(err);
                    }
                })
                
            }
            if(err){
                console.log(err);
                reject(err);
            }
        
        })
               
        })
    },

    Categories: function(data){

        return new Promise((resolve,reject)=>{
            imageApi.find({"userId":data.userID},function(err,result){
                if(result){
                    //console.log("Api console--",result)
                    resolve(result);
                }
                else{
                    reject(err);
                }
            })
        })
    },

    Posts: function(data){
    
        return new Promise((resolve,reject)=>{
            imageApi.find({},function(err,result){
               
                if(result){
                    resolve(result);
                }
                else{
                    reject(err);
                }
            })
        })
    },


    // MostCommented: function(data){
    //     return new Promise((resolve,reject)=>{
    //         console.log("before query")
    //             imageApi.find({}).sort({"comment":1}).exec(function(err,result){
    //                 if(result.length>0){
    //                     console.log("result of latest---",result)
    //                     resolve(result);
    //                 }
    //                 else{
    //                     console.log(err)
    //                     reject(err);
    //                 }
    //             })
    //     })
    // },



    MostCommented: function(data){
        return new Promise((resolve,reject)=>{
            console.log("before query")
                imageApi.aggregate([{$addFields:{comment_count:{$size:{"$ifNull":["$comment",[]]}}}},
                {$sort:{"comment_count":-1}}],function(err,result){
                    if(result){
                        console.log("result of latest---",result)
                        resolve(result);
                    }
                    else{
                        console.log(err)
                        reject(err);
                    }
                })
        })
    },
    Comment: function(data){
        //console.log("data",data.id)
        return new Promise((resolve,reject)=>{
          
                    imageApi.updateOne({"_id":data.id},{$push : {comment:data.comment}},function(err,result){
                        if(result){
                            
                               // resolve(result)
                            imageApi.findOne({"_id":data.id},function(err, result1){
                                if(result1){
                                    //console.log(result1);
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
                
        })
    },
    Data: function(data){
        //console.log(data)
        return new Promise((resolve,reject)=>{
            imageApi.find({"_id":data.id},function(err,result){
                if(result){
                   // console.log("Api console--",result)
                    resolve(result);
                }
                else{
                    console.log(err)
                    reject(err);
                }
            })
        })
    }
}
