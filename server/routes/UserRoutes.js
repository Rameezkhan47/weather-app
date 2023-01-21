const router = require("express").Router();

const {
    getWeather
  } = require("../controllers/UserController");

router.post("/weather", getWeather);



module.exports = router;
