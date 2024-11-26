const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamBoardSchema = new Schema({
  name: String,
  subject_name: String,
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  certificate_name: String,
  certificate_id: { type: Schema.Types.ObjectId, ref: "Certificate", required: true },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
});

module.exports = mongoose.model('ExamBoard', ExamBoardSchema);
