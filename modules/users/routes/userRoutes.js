const reqValidation = require("../../../commonValidation/reqValidation")
const { adduserSchemaValidation, updateuserSchemaValidation, signinSchemaValidation } = require("../validation/userValidation")
const { getallusers, adduser, deleteuser, updateuser, getuser_id, getuser_nameandemail, getuserbynameandemail, getuser_gt30, getuser_lt30, getuser_lte30, registeration, sign_in, sender, verification } = require("../controllers/userControllers")
const isAuthorized = require("../../../commonValidation/isAuthorized")
const {GET_ALL_USERS}=require("../endPoints")
const router=require("express").Router()

// router.get("/getallusers",isAuthorized(GET_ALL_USERS),getallusers) // localhost:5000/getallusers
router.get("/getallusers",getallusers) // localhost:5000/getallusers
router.post("/adduser",reqValidation(adduserSchemaValidation),adduser)  // localhost:5000/adduser
router.post("/registeration",reqValidation(adduserSchemaValidation),registeration)  // localhost:5000/registeration
router.get("/verification/:token",verification)
router.post("/signin",reqValidation(signinSchemaValidation),sign_in)  // localhost:5000/signin
router.delete("/deleteuser/:_id",deleteuser) // localhost:5000/deleteuser/6135c4567ede2bbafc305193
router.put("/updateuser/:_id",reqValidation(updateuserSchemaValidation),updateuser) // localhost:5000/updateuser/6135c467034b15711b03f02e
router.get("/getuser-id/:_id",getuser_id) // localhost:5000/getuser-id/6135c467034b15711b03f02e
router.get("/getuser-name&email/:getname/:getemail",getuser_nameandemail) // localhost:5000/getuser-name&email/a/Hala@gmail.com
router.post("/getuser-nameemail",getuserbynameandemail) // localhost:5000/getuser-nameemail
router.get("/getusers-gt30",getuser_gt30) // localhost:5000/getusers-gt30
router.get("/getusers-lt30",getuser_lt30) // localhost:5000/getusers-lt30
router.get("/getusers-lte30",getuser_lte30) // localhost:5000/getusers-lte30
router.get("/sender",sender) // localhost:5000/sender


module.exports=router

