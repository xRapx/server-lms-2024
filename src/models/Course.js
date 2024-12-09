const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
  name: String,
  subject_name: String,
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  certificate_name: String,
  certificate_id: { type: Schema.Types.ObjectId, ref: "Certificate", required: true },
  examBoard_name:String,
  examBoard_id: { type: Schema.Types.ObjectId, ref: "ExamBoard", required: true },
  category: String,
  level: String,
  description: String,
  image: String,
  videoURL:String,
  welcomeMessage: String,
  objectives: String,
  isPublised: Boolean,
  lectures: [{
    type: Schema.Types.ObjectId,
    ref: "Lecture",
  }],
});

module.exports = mongoose.model("Course", CourseSchema);
