const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  public_id: String,
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  name: String,
  subject_name: String,
  subject_id: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  certificate_name: String,
  certificate_id: { type: Schema.Types.ObjectId, ref: "Certificate", required: true },
  examBoard_name:String,
  examBoard_id: { type: Schema.Types.ObjectId, ref: "ExamBoard", required: true },
  lesson: String,
  category: String,
  level: String,
  primaryLanguage: String,
  description: String,
  image: String,
  welcomeMessage: String,
  objectives: String,
  isPublised: Boolean,
});

module.exports = mongoose.model("Course", CourseSchema);
