const reqValidation = require("../../../commonValidation/reqValidation");
const { getallblogs, addblog } = require("../controllers/blogControllers");
const { blogSchemaValidation } = require("../validation/blogValidation");

const router = require("express").Router();

router.get("/getallblogs",getallblogs)
router.post("/addblog",reqValidation(blogSchemaValidation),addblog)

module.exports=router