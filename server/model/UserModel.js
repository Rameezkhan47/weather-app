const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registeredUsersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  weatherData: {
    type: Array,
  },
});

registeredUsersSchema.statics.isUniqueUsername = async function (username) {
  try {
    const user = await this.findOne({ username });
    if (user) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("username is not unique");
    console.log(error.message);
    return false;
  }
};
const getUserByUsername = async function (username) {
  try {
    console.log(username);
    const user = await this.findOne({ username });
    return user;
  } catch (error) {
    console.log("username does not exist");
    console.log(error.message);
    return false;
  }
};

async function generatePasswordBySalt(password, salt) {
  try {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    return null;
  }
}

registeredUsersSchema.statics.getUserByCredentials = async function (
  username,
  password
) {
  try {
    const userData = await this.findOne({ username });
    if (userData) {
      const typedPasswordHash = await generatePasswordBySalt(
        password,
        userData.salt
      );
      if (typedPasswordHash == userData.password) {
        userData.password = null;
        return userData;
      } else {
        console.log("Invalid Username else case");
        console.log(error.message);
        return false;
      }
    } else {
      console.log("Invalid Username outer else");
      console.log(error.message);
      return false;
    }
  } catch (error) {
    console.log("Invalid Credentials catch");
    console.log(error.message);
    return false;
  }
};

registeredUsersSchema.statics.getUserById = async function (_id) {
  
    const userData = await this.findOne({ _id});
    return userData

}

const RegisteredUsers = mongoose.model(
  "RegisteredUsers",
  registeredUsersSchema
);
module.exports = RegisteredUsers;