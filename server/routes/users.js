var express = require('express');
var router = express.Router();
const registationcontroller= require("../controller/registration");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.use((req, res, next) => {
  console.log("TEST ROUTE: "+req.originalUrl + "::" + new Date().toISOString());
  next();
});
router.post("/registation",registationcontroller.Registation);
router.get("/getAllData",registationcontroller.getAllData);
module.exports = router;
