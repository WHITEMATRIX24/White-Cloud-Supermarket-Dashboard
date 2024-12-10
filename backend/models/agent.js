const mongoose=require('mongoose');

const agentSchema=new mongoose.Schema({
    agentName:{
        type:String,
        required:true
    },
    agent_id:{
        type:String,
        required:true,
        unique:true
    },
    referralCode:{
        type:String,
        required:true,
        unique:true
    },
    order_Details:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
    }],
    accountsCreated:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }]
});
const agents=mongoose.model('agents',agentSchema);
module.exports=agents;
