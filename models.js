//mongoose schemas//
const mongoose = require('mongoose');



const showSchema = mongoose.Schema({
    show: {
        title: {type: String,required:true},
        date: {type: String, required: true}
    }
});

showSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        title: this.title,
        date: this.date
    };
};

const show = mongoose.model('Show', showSchema);

module.exports = {Show};

