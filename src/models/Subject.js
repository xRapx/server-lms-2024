const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: String,
  certificate_name : String,
  certificate_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Certificate',
  },
  examBoards: [
    {
      type: Schema.Types.ObjectId,
      ref: "ExamBoard",
    },
  ],
});

module.exports = mongoose.model("Subject", SubjectSchema);
