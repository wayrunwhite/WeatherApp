import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import ForecastWeather from "./components/ForecastWeather";
import CurrentWeather from "./components/CurrentWeather";

const App = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const API_KEY = "d6def4924ad5f9a9b59f3ae895b234cb";

  // Récupérer la localisation et les données météo au lancement
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission de localisation refusée.");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      fetchWeatherData(currentLocation.coords.latitude, currentLocation.coords.longitude);
    })();
  }, []);

  // Récupérer les données météo à partir des coordonnées
  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo : ", error);
    }
  };

  // Récupérer la localisation d'une ville
  const searchCity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        fetchWeatherData(lat, lon);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche de la ville : ", error);
    }
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Entrez une ville"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Button title="Rechercher" onPress={searchCity} />
        {weatherData && (
          <>
            <CurrentWeather data={weatherData} />
            <ForecastWeather data={weatherData} />
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
});

export default App;
