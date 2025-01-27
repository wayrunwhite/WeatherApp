import React from "react";
import { Image } from "react-native";

const ShowIcon = ({ icon }) => {
  const url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return <Image source={{ uri: url }} style={{ width: 50, height: 50 }} />;
};

export default ShowIcon;
