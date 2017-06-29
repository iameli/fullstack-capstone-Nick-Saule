//mongoose schemas//
const mongoose = require('mongoose');



const showSchema = mongoose.Schema({
        title: {type: String,required:true},
        returns: {type: String, required: true},
        overview:{type:String},
        image: {type: String}
});

showSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        title: this.title,
        returns: this.returns,
        overview:this.overview,
        image: this.image
    };
};

const Show = mongoose.model('Show', showSchema);

module.exports = {Show};

