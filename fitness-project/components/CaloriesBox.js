// components/CaloriesBox.js

import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalorieContext from "../CalorieContext";

const CaloriesBox = ({ isDarkMode }) => {
  const { calories } = useContext(CalorieContext);

  const boxStyles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: isDarkMode ? "white" : "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    calories: {
      fontSize: 16,
      color: isDarkMode ? "white" : "black",
    },
  });

  return (
    <View style={boxStyles.container}>
      <Text style={boxStyles.title}>Today's Calories</Text>
      <Text style={boxStyles.calories}>{calories}</Text>
    </View>
  );
};

export default CaloriesBox;