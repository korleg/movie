const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema ({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [70, '`{PATH}` alanına girilen (`{VALUE}`), ({MAXLENGTH}) den fazla olamaz.'],
        minlength: [2, '`{PATH}` alanına girilen (`{VALUE}`), (`{MINLENGTH}`) den az olamaz.'],
        unique: true
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 2
    } ,
    category2: {
        type: String,
        maxlength: 30,
        minlength: 2
    } ,
    country:{
        type: String,
        maxlength: 30,
        minlength: 2
    },
    year:{
        type: Number,
        max: 2021,
        min: 1900
    },
    imdb: {
        type: Number,
        max: 10,
        min:1
    },
    URI: String,
    createdAT: {
        type: Date,
        default: Date.now,
    },
    thumbnail: String,
    konu: String,
    sure: String,
    
   
});

module.exports= mongoose.model('movie', MovieSchema);