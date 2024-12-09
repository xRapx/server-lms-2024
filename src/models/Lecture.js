const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new mongoose.Schema({
	videoUrl: String,
	public_id: String,
	freePreview: Boolean,
	pdfLink: String, 
})

const LectureSchema = new mongoose.Schema({
  name : String,
  videoUrl: String,
  course_name : String,
  course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  lessons :[LessonSchema]
});


module.exports = mongoose.model('Lecture', LectureSchema);
