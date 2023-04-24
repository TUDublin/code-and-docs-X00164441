// components/ExerciseBox.js

import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ExerciseBox = ({ exercise, isDarkMode }) => {
  const boxStyles = StyleSheet.create({
    box: {
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      justifyContent: "center",
      width: "100%",
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
  });

  return (
    <View style={boxStyles.box}>
      <Text style={boxStyles.exerciseName}>{exercise.name}</Text>
    </View>
  );
};

export default ExerciseBox;
