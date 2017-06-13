//mongoose schemas//
const mongoose = require('mongoose');



const showSchema = mongoose.Schema({
        title: {type: String,required:true},
        date: {type: String, required: true},
        overview:{type:String}
});

showSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        title: this.title,
        date: this.date,
        overview:this.overview
    };
};

const Show = mongoose.model('Show', showSchema);

module.exports = {Show};

