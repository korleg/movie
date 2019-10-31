const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema ({
    nameandsurname: {
        type: String,
        maxlength: 50,
        minlength:3,
        unique: true
    },
    bio: {
        type: String,
        maxlength: 1000,
        minlength:1,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
   
});

module.exports= mongoose.model('director', DirectorSchema);