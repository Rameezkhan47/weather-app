const User = require("../model/UserModel");

module.exports.getActivity = async (req, res) => {
  try {
    const user = await User.find({});
    if (user) {
      return res.json({ msg: "success", data: user });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching activity." });
  }
};

module.exports.addActivity = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      console.log(req.body);
      User.create({
        name: data.name,
        description: data.description,
        activity: data.activity,
        duration: data.duration,
        date: data.date,
      });
      return res.json({ msg: "Activity recorded" });
    } else return res.json({ msg: "No activity data provided" });
  } catch (error) {
    return res.json({ msg: "Error adding acivity" });
  }
};

module.exports.deleteActivity = async (req, res) => {
  try {
    const {id} = req.body;
    if (id) {
      console.log(id);
      User.findByIdAndRemove(id, (error, removedActivity) => {
        if (error) {
          return console.log(error);
        } else {
          console.log("deleted:", removedActivity);
        }
      });
      return res.json({ msg: "Activity Deleted" });
    } else return res.json({ msg: "Error, ID mismatch" });
  } catch (error) {
    return res.json({ msg: "Error adding acivity" });
  }
};

module.exports.editActivity = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      console.log(data);
      User.findByIdAndUpdate(data._id, { name: data.name, description:data.description, duration:data.duration, activity:data.activity }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", result);
        }
      });
      return res.json({ msg: "Activity Edited" });
    } else return res.json({ msg: "Error, ID mismatch" });
  } catch (error) {
    return res.json({ msg: "Error adding acivity" });
  }
};
