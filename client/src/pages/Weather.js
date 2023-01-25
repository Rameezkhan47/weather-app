import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router";

const Weather = () => {
  const user = JSON.parse(localStorage.getItem("user_key"));
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.length === 0) {
      navigate("/");
    }
    const getWeather = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/weather/" + user.username
        );
        if (response) {
          setData(response.data.info);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getWeather();
  }, []);

  setInterval(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/weather/" + user.username
        );
        if (response) {
          setData(response.data.info);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getWeather();
  }, 30 * 1000);

  async function addCity(e) {
    try {
      e.preventDefault();
      let item = city;
      console.log(city);
      const response = await axios.post("http://localhost:5000/weather", {
        item,
        username: user.username,
      });
        setData((prev) => [...prev, response.data.info]);
        setCity("");
    } catch (error) {
      console.log("error is",error);
    }
  }
  async function onAddClick(name) {
    try {
      const response = await axios.delete("http://localhost:5000/weather", {
        data: { name: name, username: user.username },
      });
      setData(response.data.info);
    } catch (error) {
      console.log(error);
    }
  }
  function logout() {
    localStorage.removeItem("user_key");
    navigate("/", { replace: true });
  }
  return (
    <>
      <div className="right">
        <Button onClick={logout} variant="outlined" color="error" size="small">
          Logout
        </Button>
      </div>
      <div className="centered">
        <form onSubmit={addCity}></form>
        <TextField
          type="text"
          label="Enter a City"
          id="outlined-basic"
          variant="outlined"
          style={{ width: "50%" }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          onClick={addCity}
          variant="contained"
          size="large"
          style={{
            height: "54px",
            borderBottomLeftRadius: "0px",
            borderTopLeftRadius: "0px",
          }}
        >
          Add City
        </Button>
      </div>
      <div>
        <Grid className="grid" container>
          {data.map((item) => {
            return (
              <React.Fragment key={item.name}>
                <Grid item xs={4}>
                  <Cards
                    clickHandler={onAddClick}
                    main={item.main}
                    name={item.name}
                    temp={item.temperature}
                    like={item.feels_like}
                    max={item.temp_max}
                    min={item.temp_min}
                    humidity={item.humidity}
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
export default Weather;
