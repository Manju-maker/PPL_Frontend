var imageApi = require("./imageSchema");

module.exports={
    Upload:function(data){

        return new Promise((resolve,reject)=>{
        imageApi.create(data,function(err,result){
            if(result){
                imageApi.find({},function(err,result1){
                    if(result1){
                       // console.log("total images-",result1);
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
            imageApi.find({},function(err,result){
                if(result){
                    //console.log("Api console--",result)
                    resolve(result);
                }
                else{
                    reject(err);
                }
            })
        })
    }
}
