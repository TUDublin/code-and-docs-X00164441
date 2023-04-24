import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  View,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { DarkModeContext } from "../../DarkModeContext";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";

const styles = (isDarkMode, activeInput) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
    },
    field: {
      marginVertical: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    inputField: (inputName) => ({
      height: 40,
      borderColor: activeInput === inputName ? "#1463F3" : "gray",
      borderWidth: 1,
      padding: 10,
      marginVertical: 5,
      width: "72%",
      borderRadius: 5,
      backgroundColor: isDarkMode ? "#3b3b3b" : "white",
      color: isDarkMode ? "white" : "black",
    }),
    addExercisesButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: "#1463F3",
      fontSize: 18,
      fontWeight: "bold",
    },
    exerciseItem: {
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: "100%",
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "bold",
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

export default function UserWorkouts() {
  const [name, setName] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(DarkModeContext);
  const [navmodalVisible, setnavModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const navigateToDashboard = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("Dashboard");
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

  const navigateToCalorieTracker = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("CalorieTracker");
  };

  const navigateToWeightTracker = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("WeightTracker");
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
              onPress={navigateToDashboard}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="dashboard"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Dashboard
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToViewExercises}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="view-agenda"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  View Exercises
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToWorkoutList}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="view-headline"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Edit/View Workouts
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToCreateWorkout}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="rate-review"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Create Workout
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToCalorieTracker}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="emoji-food-beverage"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Calorie Tracker
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToWeightTracker}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="weight"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Weight Tracker
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToProfilePage}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="profile"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Profile Page
                </Text>
              </View>
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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addExercise = () => {
    // Add this validation for Exercise Name and Body Part
    if (!name.trim() || !bodyPart.trim()) {
      alert("Please enter both Exercise Name and Body Part.");
      return;
    }

    const exerciseData = {
      name: name.trim(),
      bodyPart: bodyPart.trim(),
      imageUrl: imageUrl.trim(), // Add imageUrl to the exercise data
      userId: currentUser.uid,
    };

    firebase
      .firestore()
      .collection("Exercises")
      .add(exerciseData)
      .then(() => {
        console.log("Exercise added!");
        // Add this alert to show the exercise has been added successfully
        alert(
          `Exercise has been added successfully!\nExercise Name: ${name}\nBody Part: ${bodyPart}`
        );
        setName("");
        setBodyPart("");
        setImageUrl(""); // Clear the imageUrl input after adding an exercise
      })
      .catch((error) => {
        console.log("Error adding exercise:", error);
      });
  };

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ModalMenu />
      <Text style={styles(isDarkMode).field}>Exercise Name:</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField("exerciseName")}
        value={name}
        onChangeText={setName}
        onFocus={() => setActiveInput("exerciseName")}
        onBlur={() => setActiveInput(null)}
        clearButtonMode="always"
      />
      <Text style={styles(isDarkMode).field}>Body Part:</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField("bodyPart")}
        value={bodyPart}
        onChangeText={setBodyPart}
        onFocus={() => setActiveInput("bodyPart")}
        onBlur={() => setActiveInput(null)}
        clearButtonMode="always"
      />
      <Text style={styles(isDarkMode).field}>Image URL:</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField("imageURL")}
        value={imageUrl}
        onChangeText={setImageUrl}
        onFocus={() => setActiveInput("imageURL")}
        onBlur={() => setActiveInput(null)}
        clearButtonMode="always"
      />
      <TouchableOpacity
        style={styles(isDarkMode).addExercisesButton}
        onPress={addExercise}
      >
        <Text style={styles(isDarkMode).buttonText}>Add Exercise</Text>
        <MaterialIcons
          name="check"
          size={24}
          color="#1463F3"
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
