const { LabelDetail } = require("semantic-ui-react");
const User = require("../model/UserModel");

module.exports.getWeather = async (req, res) => {
  try {
    let { city } = req.body;
    console.log(city);
    const data = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&days=15&units=I&key=4874c5046ba04eaa9c672e4bdcda9d64
      `
    ).then((res) => res.json());
    return res.send({ msg: "Success", data: data });
  } catch (error) {
    return res.json({ msg: "Error fetching activity." });
  }
};

