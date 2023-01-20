
const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 100,
      },
  name: {
    type: String,
    required: true,
    max: 30,
  },
  activity: {
    type: String,
    required: true,
    max: 20,
  },
  duration: {
    type: String,
    required: true

},
date: {
    type: Date
}

});
const UserActivity = mongoose.model("UserActivity",userActivitySchema)

module.exports = UserActivity;