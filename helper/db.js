const mongoose = require('mongoose');


module.exports= ()=>{
    mongoose.connect('mongodb://movie_user:abcd1234@ds251894.mlab.com:51894/heroku_vlp2hrpr', {
        useNewUrlParser: true,
        useFindAndModify: false, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
});
    mongoose.connection.on('open', ()=>{
        // console.log('MongoDB: Connected.');
    });
    mongoose.connection.on('error', (err)=>{
        console.log('MongoDB: Error', err);
    });
    mongoose.Promise = global.Promise;
};