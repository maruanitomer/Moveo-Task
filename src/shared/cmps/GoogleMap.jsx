import React from "react";
import { GMapify } from "g-mapify";
import "g-mapify/dist/index.css";
import { Typography } from "@mui/material";
import { googleMapKey } from "../../../key/key";
export const GoogleMap = ({ lat, lon, location }) => {
  const country = location.country;
  const state = location.state;
  const street = location.street.name + ", " + location.street.number;
  const city = location.city;
  const adress = state + " " + country + " " + city + " " + street;
  const parsedLat = parseFloat(lat);
  const parsedLon = parseFloat(lon);
  const markers = [[parsedLat, parsedLon, adress]];
  return (
    <>
      <GMapify
        appKey={googleMapKey}
        customMarkers={markers}
        autoCenter={false}
        HasMarker={true}
        markerIcon={""}
      />
      <Typography
        component="span"
        sx={{
          fontWeight: "600",
          fontSize: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
        noWrap
      >
        {adress}
      </Typography>
    </>
  );
};
