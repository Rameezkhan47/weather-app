const router = require("express").Router();

const {
    getActivity, addActivity, deleteActivity,editActivity
  } = require("../controllers/UserController");

router.get("/activity", getActivity);
router.post("/activity", addActivity);
router.delete("/activity", deleteActivity);
router.put("/activity", editActivity);



module.exports = router;
