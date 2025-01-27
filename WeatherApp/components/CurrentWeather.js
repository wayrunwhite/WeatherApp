import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ShowIcon from "./ShowIcon";

const CurrentWeather = ({ data }) => {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (data) {
      setCurrent(data.list[0]); // Première prévision
    }
  }, [data]);

  return current ? (
    <View style={styles.container}>
      <Text style={styles.city}>{data.city.name}</Text>
      <Text style={styles.date}>{new Date(current.dt * 1000).toLocaleString()}</Text>
      <ShowIcon icon={current.weather[0].icon} />
      <Text style={styles.temp}>{Math.round(current.main.temp)}°C</Text>
      <Text style={styles.description}>{current.weather[0].description}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 20 },
  city: { fontSize: 24, fontWeight: "bold" },
  date: { fontSize: 16, color: "gray" },
  temp: { fontSize: 48, fontWeight: "bold" },
  description: { fontSize: 18, fontStyle: "italic" },
});

export default CurrentWeather;
