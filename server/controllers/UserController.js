
const RegisteredUsers = require("../model/UserModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { update } = require("../model/UserModel");
const io = require("socket.io")(4000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);
});


setInterval(async () => {
  io.emit("latest", await updateCity());
}, 30 * 1000);

async function passwordHash(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  } catch (error) {
    return null;
  }
}
async function updateCity() {
  try {
    const user = await RegisteredUsers.find();
    const { weatherData } = user[0]
    for (curr of user) {
      const { weatherData, username } =  user[user.indexOf(curr)]
    for (city of weatherData) {
      const data = await fetch(
        `${process.env.API_URL}/weather?q=${city.name}&appid=${process.env.API_KEY}&units=metric`
      ).then((res) => res.json());
      const info = data;
      const weather = {
        name: info.name,
        main: info.weather[0].main,
        temperature: info.main.temp,
        feels_like: info.main.feels_like,
        temp_max: info.main.temp_max,
        temp_min: info.main.temp_min,
        humidity: info.main.humidity,
      };
      weatherData[weatherData.indexOf(city)] = weather;
      await RegisteredUsers.findOneAndUpdate(
        { username },
        { weatherData: weatherData }
      );
    }
  }


  } catch (err) {
    console.log(err);
  }
}
updateCity();

module.exports.savedWeather = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await RegisteredUsers.findOne({ username});
    const { weatherData } = user;
    res.json({ message: "success", info: weatherData });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Error fetching activity." });
  }
};

module.exports.getWeather = async (req, res) => {
  try {
    let { item, username } = req.body;
    const user = await RegisteredUsers.findOne({ username});
    const info = await fetch(
      `${process.env.API_URL}/weather?q=${item}&appid=${process.env.API_KEY}&units=metric`
    ).then((res) => res.json());
    const weather = {
      name: info.name,
      main: info.weather[0].main,
      temperature: info.main.temp,
      feels_like: info.main.feels_like,
      temp_max: info.main.temp_max,
      temp_min: info.main.temp_min,
      humidity: info.main.humidity,
    };
    const { weatherData } = user;

    const cityAlreadyAdded = weatherData.find(({ name }) => name == item);

    if (!cityAlreadyAdded) {
      await RegisteredUsers.findOneAndUpdate(
        { username },
        { weatherData: [...user.weatherData, weather] }
      );
      res.json({ msg: "Success", info: weather });
    }
    else{
      res.json({msg: 'City Already Added'})
    }
  } catch (error) {
    return res.json({ msg: "Error fetching activity." });
  }
};

module.exports.deleteWeather = async (req, res) => {
  try {
    let { name, username } = req.body;
    await RegisteredUsers.updateOne(
      { username},
      { $pull: { weatherData: { name: name } } },
      { safe: true, multi: true }
    );
    const user = await RegisteredUsers.findOne({ username });
    const { weatherData } = user;
    res.json({ message: "success", info: weatherData });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Error fetching activity." });
  }
};

module.exports.userSignUp = async (req, res) => {
  const body = req.body;
  const passwordRes = await passwordHash(body.password);
  body.salt = passwordRes.salt;
  body.password = passwordRes.hash;
  const isNewUser = await RegisteredUsers.isUniqueUsername(body.username);
  if (!isNewUser) {
    return res.json({
      success: false,
      message: "username already in use, try logging in",
    });
  }
  await RegisteredUsers.create({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    salt: body.salt,
    password: body.password,
  });
  return res.json({ msg: "New User Created" });
};

module.exports.userLogIn = async (req, res) => {
  const body = req.body;
  try {
    const fetchedUser = await RegisteredUsers.getUserByCredentials(
      body.username,
      body.password
    );
    if (fetchedUser) {
      return res.status(200).json({ data: fetchedUser, message: "success" });
    } else {
      return res.status(400).json({ data: null, message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "server error" });
  }
};
