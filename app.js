let express = require("express");
let app = express();
let path = require('path');
let { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override');
let mongoose = require('mongoose');
let listing = require('./models/listing.js');
let ejsMate = require('ejs-mate');
let favorite = require('./models/fav.js');
const { resolveSoa } = require("dns");
let ExpressError = require('./util/ExpressError.js');
let wrapAsync = require('./util/wrapAsync.js');
let listingSchema= require('./util/listingSchema.js');

app.engine('ejs',ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main().then((res) => {
    console.log('Database working !!!');
}).catch((err) => {
    console.log(err);
})

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/HOTAI');
}

//------------------------------------------------------------------------------
//middleware
// app.use((req,res,next)=>{
//     req.time = new Date(Date.now());
//     console.log(req.method,req.path,req.hostname,req.time)
//     next();
// })

let listingValidation = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error.message);
    }
    else{
        next();
    }
}

app.use((req,res,next)=>{
    console.log('helo')
    next();
})

//------------------------------------------------------------------------------
app.get('/deshboard',async (req,res)=>{
    let listing1 =await listing.find({});
res.render('listing/deshboard.ejs',{listing1});
})

app.get('/listing/login',(req,res)=>{
    res.render('listing/login')
})


app.get('/', (req, res) => {
    res.render('listing/home');
})

app.get('/listing', wrapAsync(async(req, res) => {
    let listing1 = await listing.find({});
    res.render('listing/index', { listing1 });
}))

//Create---------------------------------------------------------
app.get('/listing/create',(req, res) => {
    res.render('listing/create');
})

app.post('/listing',listingValidation,wrapAsync(async(req, res,next) => {

    let listing1 = req.body.listing;
    let saveListing = new listing(listing1);
    await saveListing.save();
    res.redirect('/listing');}
))
//Show---------------------------------------------------------
app.get('/listing/:id',wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let list = await listing.findById(id);
    res.render('listing/show',{list});
}))

//Edit---------------------------------------------------------
app.get('/listing/:id/edit',wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let list = await listing.findById(id);
    res.render('listing/edit',{list})
}))

app.put('/listing/:id',listingValidation,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect('/listing');
}))

//Delete---------------------------------------------------------
app.delete('/listing/:id',wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect('/listing');
}))

//Footer---------------------------------------------------------
app.get('/listing/f/privecy',(req,res)=>{
    res.render('listing/privecy');
})
app.get('/listing/f/terms',(req,res)=>{
    res.render('listing/privecy');
})


//fav---------------------------------------------------------
app.get('/fav/:id',wrapAsync(async(req,res)=>{
    let {id} =req.params;
    let fav = await listing.findById(id);
    let fav1  = await new favorite({
        Title: fav.Title,
        Description: fav.Description,
        Image:fav.Image,
        Price:fav.Price,
        Location:fav.Location,
        Country:fav.Country,
    });
    await fav1.save();
    res.redirect('/fav')
}))
app.get('/fav',wrapAsync(async(req,res)=>{
    let fav1 =await favorite.find()
    res.render('listing/fav',{fav1})
}))

//Delete---------------------------------------------------------
app.delete('/fav/:id',wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await favorite.deleteOne({_id:id});
    res.redirect('/fav')    
}))
//------------------------------------------------------------------

app.get('/new',wrapAsync(async(req,res)=>{
    let listing1 = await listing.find({});
    res.render('listing/new',{listing1})
}))

app.all('*',(req,res,next)=>{
    throw new ExpressError(404,'Page not found')
})

app.use((err,req,res,next)=>{
    let {status=500, message='somthing gone wrong'}=err;
    res.status(status).render('listing/error',{message});
})

app.listen(3000, () => { console.log('Code is runing on port 3000') });




// THIS IS CODE OF INDEX.EJS CREATED BY ME

/* <div class="line" style="width: 20rem;">
<%for(let list of listing1){%>
        <div class="all details">
            <a href="/listing/<%=list.id%>"><img src="<%=list.Image%>"></a>
            <div class="details-body">
            <form action="/listing/<%=list._id%>?_method=delete" method="post">
                <button class="delete">Offer</button>
            </form>
            <a href="/listing/<%=list.id%>"><h5 class="titletext"><%=list.Title%></h5></a>
        </div>  
        <!-- <form action="/listing/<%=list.id%>"><button class="bookbtn">Book now </button></form> -->
        <p><%=list.Description%></p>
        <p><%=list.Location%></p>
        <p><%=list.Country%></p>
        <h6> &#8377;<%=list.Price%></h6>
        </div>
    <%}%></div> */


    