const reqValidation = require("../../../commonValidation/reqValidation");
const { getallblogs, addblog, updateblog, deleteallblogs, return_deletedblogs, getblog_id, getblog_titlecontent, getblog_user, getblog_today, getblog_yesterday } = require("../controllers/blogControllers");
const { blogSchemaValidation } = require("../validation/blogValidation");

const router = require("express").Router();

router.get("/getallblogs",getallblogs)  // localhost:5000/getallblogs
router.post("/addblog",reqValidation(blogSchemaValidation),addblog) // localhost:5000/addblog
router.put("/updateblog/:_id",updateblog)  // localhost:5000/updateblog
router.get("/deleteallblogs",deleteallblogs)  // localhost:5000/deleteallblogs
router.get("/returnblogs",return_deletedblogs)  // localhost:5000/returnblogs
router.get("/getblog-id/:_id",getblog_id)  // localhost:5000/getblog-id/61398f133469f43c4720447e
router.get("/getblog-title&content/:title/:content",getblog_titlecontent)  // localhost:5000/getblog-title&content/title/content
router.post("/getblog-user",getblog_user)  // localhost:5000/getblog-user
router.get("/getallblogs-today",getblog_today)  // localhost:5000/getallblogs-today
router.get("/getallblogs-yesterday",getblog_yesterday)  // localhost:5000/getallblogs-yesterday

module.exports=router