import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ShowIcon from "./ShowIcon";

const Weather = ({ forecast }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {new Date(forecast.dt * 1000).getHours()}h
      </Text>
      <ShowIcon icon={forecast.weather[0].icon} />
      <Text style={styles.temp}>{Math.round(forecast.main.temp)}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", margin: 5 },
  time: { fontSize: 16 },
  temp: { fontSize: 16, fontWeight: "bold" },
});

export default Weather;
