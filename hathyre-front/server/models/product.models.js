const mongoose = require ("mongoose");

const productSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },

        price : {
            type : String,
            required : true,
        },

        likers: {
            type : String
        },

        description : {
            type : String,
            required : true,
        },
    },
    {timestamps : true}
);

module.exports = mongoose.model('product', productSchema);