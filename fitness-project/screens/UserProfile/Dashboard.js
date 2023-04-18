import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, SafeAreaView } from "react-native";
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
    buttonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 20,
    },
    button: {
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
      paddingVertical: 5,
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "white" : "black",
    },
    buttonText: { 
      color: isDarkMode ? "white" : "black",
      fontSize: 18,
      fontWeight: "bold",
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
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
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const navigateToExercises = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("Exercises");
  };

  const navigateToViewExercises = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("ViewExercises");
  };

  const navigateToCreateWorkout = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("CreateWorkout");
  };

  const navigateToWorkoutList = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("WorkoutList");
  };

  const ModalMenu = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles(isDarkMode).modalOverlay}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles(isDarkMode).modalView}>
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
              <Text style={styles(isDarkMode).buttonText}>
                Edit/View Workouts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).button}
              onPress={navigateToExercises}
            >
              <Text style={styles(isDarkMode).buttonText}>Add Exercises</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).button}
              onPress={navigateToCreateWorkout}
            >
              <Text style={styles(isDarkMode).buttonText}>Create Workout</Text>
            </TouchableOpacity>

    
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{}}>
          <MaterialIcons
            name="more-vert"
            size={32}
            color={isDarkMode ? "white" : "#1463F3"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isDarkMode, setModalVisible]);

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ModalMenu />
    </SafeAreaView>
  );
}
