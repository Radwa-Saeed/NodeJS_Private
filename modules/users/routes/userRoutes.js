const reqValidation = require("../../../commonValidation/reqValidation")
const { adduserSchemaValidation } = require("../validation/userValidation")
const { getallusers, adduser, deleteuser, updateuser, getuser_id, getuser_nameandemail, getuserbynameandemail } = require("../controllers/userControllers")


const router=require("express").Router()

router.get("/getallusers",getallusers) // localhost:5000/getallusers
router.post("/adduser",reqValidation(adduserSchemaValidation),adduser)  // localhost:5000/adduser
router.delete("/deleteuser/:_id",deleteuser) // localhost:5000/deleteuser/6135c4567ede2bbafc305193
router.put("/updateuser/:_id",updateuser) // localhost:5000/updateuser/6135c467034b15711b03f02e
router.get("/getuser-id/:_id",getuser_id) // localhost:5000/getuser-id/6135c467034b15711b03f02e
router.get("/getuser-name&email/:getname/:getemail",getuser_nameandemail) // localhost:5000/getuser-name&email/a/Hala@gmail.com
router.post("/getuser-nameemail",getuserbynameandemail) // localhost:5000/getuser-nameemail
router.get("/getusers-age>30",getallusers) // localhost:5000/getallusers
router.get("/getusers-age<30",getallusers) // localhost:5000/getallusers
router.get("/getusers-age<=30",getallusers) // localhost:5000/getallusers

module.exports=router

