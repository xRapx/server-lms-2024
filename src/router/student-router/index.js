const express = require("express");
const { getAllStudentViewCourses, getStudentViewCourseDetails, checkCoursePurchaseInfo } = require("../../controllers/student-controller");

const router = express.Router();

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCourseDetails);

module.exports = router;