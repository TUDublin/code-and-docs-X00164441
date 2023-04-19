import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
} from "react-native";
import { DarkModeContext } from "../../DarkModeContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

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
    navmodalbutton: {
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
      paddingVertical: 5,
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "white" : "black",
    },
    navmodalbuttonText: {
      color: isDarkMode ? "white" : "black",
      fontSize: 18,
      fontWeight: "bold",
    },
    navmodalOverlay: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    navmodalView: {
      marginTop: 60,
      marginRight: 20,
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
      borderRadius: 10,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

export default function Dashboard() {
  const [navmodalVisible, setnavModalVisible] = useState(false);
  const navigation = useNavigation();

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const navigateToExercises = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("Exercises");
  };

  const navigateToViewExercises = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("ViewExercises");
  };

  const navigateToCreateWorkout = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("CreateWorkout");
  };

  const navigateToWorkoutList = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("WorkoutList");
  };

  const navigateToProfilePage = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("Profile");
  };

  const ModalMenu = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={navmodalVisible}
        onRequestClose={() => {
          setnavModalVisible(!navmodalVisible);
        }}
      >
        <TouchableOpacity
          style={styles(isDarkMode).navmodalOverlay}
          onPress={() => setnavModalVisible(!navmodalVisible)}
        >
          <View style={styles(isDarkMode).navmodalView}>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToViewExercises}
            >
              <Text style={styles(isDarkMode).navmodalbuttonText}>
                View Exercises
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToWorkoutList}
            >
              <Text style={styles(isDarkMode).navmodalbuttonText}>
                Edit/View Workouts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToExercises}
            >
              <Text style={styles(isDarkMode).navmodalbuttonText}>
                Add Exercises
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToCreateWorkout}
            >
              <Text style={styles(isDarkMode).navmodalbuttonText}>
                Create Workout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToProfilePage}
            >
              <Text style={styles(isDarkMode).navmodalbuttonText}>
                Profile Page
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setnavModalVisible(true)} style={{}}>
          <MaterialIcons
            name="more-vert"
            size={32}
            color={isDarkMode ? "#1463F3" : "#1463F3"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isDarkMode, setnavModalVisible]);

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ModalMenu />
    </SafeAreaView>
  );
}
