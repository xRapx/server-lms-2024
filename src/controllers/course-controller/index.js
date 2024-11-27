const Subject = require("../../models/Subject");
const ExamBoard = require("../../models/ExamBoard");
const Course = require("../../models/Course");
const Certificate = require("../../models/Certificate");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: saveCourse,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getCourseDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateCourseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// ======================================> Form Create Course <============================================================
async function createCertificate(req, res) {
  //try catch and Create a new certificate with a specific name
  try {
    const { name } = req.body;
    const newCertificate = new Certificate({ name });
    await newCertificate.save();

    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: newCertificate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating the certificate",
    });
  }
}

async function createSubject(req, res) {
  //try catch and Create a new Subject with a specific name
  try {
    const { certificate_name } = req.body;
    //find Certificate where name === certificate
    const newCert = await Certificate.findOne({ name: certificate_name });
    if (!newCert) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found!",
      });
    }
    //Create a new Subject with a specific name
    const newSubject = new Subject({
      name: req.body.name,
      certificate_name: req.body.certificate_name,
      certificate_id: newCert._id,
    });
    await newSubject.save();

    //Add Subject to the Certificate
    newCert.subjects.push(newSubject._id);
    await newCert.save();

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: newSubject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating the Subject",
    });
  }
}

async function createExam(req, res) {
  //try catch and Create a new Subject with a specific name
  try {
    const { certificate_name, subject_name, name } = req.body;

    //find Certificate where name === certificate
    const newCert = await Certificate.findOne({ name: certificate_name });
    if (!newCert) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found!",
      });
    }
    //find Subject where name === subject
    const newSub = await Subject.findOne({
      name: subject_name,
      certificate_id: newCert._id,
    });
    if (!newSub) {
      return res.status(404).json({
        success: false,
        message: "Subject not found!",
      });
    }

    const newExam = new ExamBoard({
      name: name,
      subject_name,
      certificate_name,
      subject_id: newSub._id,
      certificate_id: newCert._id,
    });
    await newExam.save();

    newSub.examBoards.push(newExam._id);
    await newSub.save();

    res.status(201).json({
      success: true,
      message: "ExamBoard created successfully",
      data: newExam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating the ExamBoard",
    });
  }
}

// Tạo dữ liệu mẫu
async function createCourse(req, res) {
  try {
    const {
      certificate_name,
      subject_name,
      examBoard_name,
      name,
      lesson,
      category,
      level,
      primaryLanguage,
      description,
      image,
      welcomeMessage,
      objectives,
      isPublised,
    } = req.body;

    //find Certificate where name === certificate_name
    const newCert = await Certificate.findOne({ name: certificate_name });
    if (!newCert) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found!",
      });
    }
    //find Subject where name === subject_name
    const newSub = await Subject.findOne({
      name: subject_name,
      certificate_id: newCert._id,
    });
    if (!newSub) {
      return res.status(404).json({
        success: false,
        message: "Subject not found!",
      });
    }
    //find ExamBoard where name === examBoard_name
    const newExam = await ExamBoard.findOne({
      name: examBoard_name,
      subject_id: newSub._id,
      certificate_id: newCert._id,
    });
    if (!newExam) {
      return res.status(404).json({
        success: false,
        message: "ExamBoard not found!",
      });
    }
    console.log(newExam)

    const course = new Course({
      name,
      subject_name,
      certificate_name,
      examBoard_name,
      subject_id: newSub._id,
      certificate_id: newCert._id,
      examBoard_id: newExam._id,
      lesson,
      category,
      level,
      primaryLanguage,
      description,
      image,
      welcomeMessage,
      objectives,
      isPublised,
    });
    await course.save();

    //course liên kết với examboard
    newExam.courses.push(course._id);
    await newExam.save();

    res
      .status(201)
      .json({ success: true, message: "Sample data created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating sample data", error });
  }
}

async function dataCourse(req, res) {
  try {
    const course = await Certificate.find().populate({
      path: "subjects",
      populate: {
        path: "examBoards",
        populate: {
          path: "courses",
        },
      },
    });

    res.status(200).json({ success: true, data: course });

    console.log(course);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching data", error });
  }
}
// ======================================> End <============================================================

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseByID,
  getCourseDetailsByID,
  createCertificate,
  createSubject,
  createExam,
  createCourse,
  dataCourse,
};
