const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ewastemanagment")
.then(()=>{
    console.log('connected');
})
.catch((e)=>{
    console.log(e);
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('user',logInSchema)

module.exports=LogInCollection