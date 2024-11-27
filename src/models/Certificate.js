const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  name: String,
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: 'Subject',
  }],
});

module.exports = mongoose.model('Certificate', CertificateSchema);
