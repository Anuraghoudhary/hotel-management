let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/HOTAI');
let listing = require('../models/listing.js');
let data = require('./data')
let fav = require('../models/fav.js');

async function initdata(){
await listing.deleteMany({});
await listing.insertMany(data.data1);
}


initdata().then((res)=>{console.log('data was init !!!')}
).catch((err)=>{console.log(err)});

// for fav
// fav.insertMany([
//     {
//         Title: 'Tere naam',
//         Description: 'A nature - inspired resort near Jim Corbett National Park, perfect for wildlife enthusiasts and those seeking a peaceful getaway.',
//         Image: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWxzfGVufDB8fDB8fHww',
//         Price: 25000,
//         Location: 'rishikesh, Uttarakhand',
//         Country: 'India'
//     },
//     {
//         Title: "Cozy Beachfront Cottage",
//         Description:
//             "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//         Image:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//         Price: 1500,
//         Location: "Malibu",
//         Country: "United States",
//     },
// ])
