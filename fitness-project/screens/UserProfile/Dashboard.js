import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DarkModeContext } from "../../DarkModeContext";
import { useNavigation } from "@react-navigation/native";

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: isDarkMode ? "white" : "black",
      },
    buttonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 20,
    },
    button: {
      backgroundColor: isDarkMode ? "#525252" : "#5897EE",
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
      width: "32%",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default function Dashboard() {
  const navigation = useNavigation();

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const navigateToWeightTracker = () => {
    navigation.navigate("WeightTracker");
  };

  const navigateToCalorieTracker = () => {
    navigation.navigate("CalorieTracker");
  };

  const navigateToViewExercises = () => {
    navigation.navigate("ViewExercises");
  };

  const navigateToWorkoutList = () => {
    navigation.navigate("WorkoutList");
  };

  return (
    <View style={styles(isDarkMode).container}>
      <Text style={styles(isDarkMode).title}>Dashboard</Text>
      <TouchableOpacity
        style={styles(isDarkMode).button}
        onPress={navigateToViewExercises}
      >
        <Text style={styles(isDarkMode).buttonText}>View Exercises</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles(isDarkMode).button}
        onPress={navigateToWorkoutList}
      >
        <Text style={styles(isDarkMode).buttonText}>Edit/View Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles(isDarkMode).button}
        onPress={navigateToWeightTracker}
      >
        <Text style={styles(isDarkMode).buttonText}>Weight Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles(isDarkMode).button}
        onPress={navigateToCalorieTracker}
      >
        <Text style={styles(isDarkMode).buttonText}>Calorie Tracker</Text>
      </TouchableOpacity>
    </View>
  );
}
