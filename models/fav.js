let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/HOTAI');

let favSchema= mongoose.Schema({
    Title: {
        type: String,
        require:true
    },
    Description: {
        type: String,
        require:true
    },
    Image:{
        type: String,
        default:'https://images.unsplash.com/photo-1469881317953-097ae79770ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        set:(v)=>v===" "?"https://images.unsplash.com/photo-1469881317953-097ae79770ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v
    },
    Price: {
        type: Number,
        require:true
    },
    Location: {
        type: String,
        require:true
    },
    Country: {
        type: String,
        require:true
    }
})

module.exports=mongoose.model('favorite',favSchema);