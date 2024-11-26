const express = require("express");
const {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseByID,
  createCertificate,
  createSubject,
  createExam,
  createCourse,
  dataCourse,
} = require("../../controllers/course-controller");

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsByID);
router.put("/update/:id", updateCourseByID);

// Route để tạo dữ liệu mẫu
router.post("/create-certificate", createCertificate);
router.post("/create-subject", createSubject);
router.post("/create-exam", createExam);
router.post("/create-course", createCourse);

router.get("/get-data",dataCourse)

module.exports = router;
