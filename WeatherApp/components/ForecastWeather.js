import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Weather from "./Weather";

const ForecastWeather = ({ data }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (data) {
      const groupedData = data.list.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0];
        acc[date] = acc[date] ? [...acc[date], item] : [item];
        return acc;
      }, {});
      setForecast(Object.values(groupedData));
    }
  }, [data]);

  return (
    <ScrollView horizontal style={styles.scroll}>
      {forecast.map((day, index) => (
        <View key={index} style={styles.day}>
          {day.map((hour, idx) => (
            <Weather key={idx} forecast={hour} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { marginVertical: 20 },
  day: { marginHorizontal: 10 },
});

export default ForecastWeather;
