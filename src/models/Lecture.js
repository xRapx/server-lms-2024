const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new mongoose.Schema({
  answer_id:String,
  answer_text: { type: String, required: true },
  is_correct: { type: Boolean, required: true }
});

const QuestionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  answers: [AnswerSchema],
});

const LessonSchema = new mongoose.Schema({
  name: String,
  videoUrl: String,
  public_id: String,
  freePreview: Boolean,
  pdfLink: String
});

const LectureSchema = new mongoose.Schema({
  name: String,
  videoUrl: String,
  value: String,
  course_name: String,
  course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  lessons: [LessonSchema],
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Lecture', LectureSchema);
