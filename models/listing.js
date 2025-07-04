let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/HOTAI');

let listingSchema= mongoose.Schema({
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
        default:"https://imexpert.au/wp-content/uploads/2023/08/image-not-found.png",
        set:(v)=>v===""?"https://imexpert.au/wp-content/uploads/2023/08/image-not-found.png":v
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

module.exports=mongoose.model('listing',listingSchema);