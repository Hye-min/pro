var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  post: {type: Schema.Types.ObjectId, required: true, trim: true},
  content: {type: String, required: true, trim: true},

}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var short = mongoose.model('short', schema);

module.exports = short;
