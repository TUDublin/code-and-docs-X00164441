// components/ExerciseBox.js

import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const ExerciseBox = ({ exercise, isDarkMode }) => {
  const boxStyles = StyleSheet.create({
    box: {
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
      borderWidth: 1,
      borderColor: isDarkMode ? "white" : "black",
      borderRadius: 10,
      padding: 10,
      marginVertical: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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