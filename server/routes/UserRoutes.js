const router = require("express").Router();

const {
    getWeather, userSignUp, userLogIn, savedWeather, deleteWeather
  } = require("../controllers/UserController");

router.post("/weather", getWeather);
router.post("/signup", userSignUp);
router.post("/login",userLogIn )
router.get("/weather/:username", savedWeather)
router.delete("/weather", deleteWeather)



module.exports = router;
