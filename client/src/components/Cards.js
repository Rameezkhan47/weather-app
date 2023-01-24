import React from "react";
import "../App.css";
import Image from "../assets/bg-img.jpeg";
import { Box, Card, CardContent, Typography } from "@mui/material";
function Cards(props) {
  const styles = {
    paperContainer: {
      backgroundImage: `url(${Image})`,
    },
  };

  function clickHandler() {
    props.clickHandler(props.name);
  }

  return (
    <React.Fragment key={props.name}>
    <Card 
        onClick={clickHandler}
        sx={{
          maxWidth: 385,
          marginTop: 3,
          backgroundSize: 350,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgb(6,57,112, 0.3)",
        }}
        style={styles.paperContainer}
      >
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Box p={4}>
              <Typography
                variant="h5"
                color="textPrimary"
                style={{ fontSize: "28px" }}
              >
                {props.name}, Pakistan
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardContent>
          <Box display="flex" flexDirection="row-reverse">
            <Box p={0}>
              <Typography variant="h4" color="textPrimary">
                Temp: {Math.round(parseFloat(props.temp))}
                <span>&#176;</span>
                {"C"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardContent>
          <Box display="flex" flexDirection="row-reverse">
            <Box p={0}>
              <Typography variant="h6" color="textSecondary">
                {props.main}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                Real Feel: {Math.round(parseFloat(props.like))}{" "}
                <span>&#176;</span>
                {"C"}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                Max: {Math.round(parseFloat(props.max))} <span>&#176;</span>
                {"C"}
              </Typography>
            </Box>

            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                Min: {Math.round(parseFloat(props.min))} <span>&#176;</span>
                {"C"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Box p={1}>
              <Typography variant="h6" color="textPrimary">
                Humidity: {props.humidity} %
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      </React.Fragment>

  );
}

export default Cards;
