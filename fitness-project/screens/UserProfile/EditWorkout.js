import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Button,
  Modal,
} from "react-native";
import { firebase } from "../../firebase/config";
import { Switch } from "react-native";
import { DarkModeContext } from "../../DarkModeContext";
import { MaterialIcons } from "@expo/vector-icons";

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
    updateWorkoutButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    exerciseItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    exerciseName: {
      fontSize: 16,
      marginRight: 10,
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

const EditWorkout = ({ route, navigation }) => {
  const { workoutId } = route.params;
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({});
  const { isDarkMode } = useContext(DarkModeContext);
  const [navmodalVisible, setnavModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const navigateToDashboard = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("Dashboard");
  };

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
              onPress={navigateToDashboard}
            >
              <Text style={styles(isDarkMode).navmodalbuttonText}>
                Dashboard
              </Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={{
                left: 140,
              }}
              onPress={confirmDeleteWorkout}
            >
              <MaterialIcons
                name="delete"
                size={32}
                color={isDarkMode ? "#a90505" : "#a90505"}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
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
    const fetchWorkout = async () => {
      try {
        const workoutDoc = await firebase
          .firestore()
          .collection("Workouts")
          .doc(workoutId)
          .get();

        const workoutData = workoutDoc.data();
        setWorkoutName(workoutData.name);
        setSelectedExercises(
          workoutData.exercises.reduce(
            (acc, exerciseId) => ({ ...acc, [exerciseId]: true }),
            {}
          )
        );
      } catch (error) {
        console.log("Error fetching workout data:", error);
      }
    };

    const userId = firebase.auth().currentUser.uid;

    const unsubscribeExercises = firebase
      .firestore()
      .collection("Exercises")
      .where("userId", "==", userId)
      .onSnapshot((querySnapshot) => {
        const exercisesData = [];
        querySnapshot.forEach((doc) => {
          const exercise = doc.data();
          exercise.id = doc.id;
          exercisesData.push(exercise);
        });
        setExercises(exercisesData);
      });

    fetchWorkout();

    return () => {
      unsubscribeExercises();
    };
  }, [workoutId]);

  const toggleExerciseSelection = (exerciseId) => {
    setSelectedExercises((prevState) => ({
      ...prevState,
      [exerciseId]: !prevState[exerciseId],
    }));
  };

  const updateWorkout = async () => {
    if (!workoutName.trim()) {
      alert("Please enter a workout name");
      return;
    }
    const selectedExerciseIds = Object.keys(selectedExercises).filter(
      (id) => selectedExercises[id]
    );

    if (selectedExerciseIds.length === 0) {
      alert("Please select at least one exercise");
      return;
    }

    const workoutData = {
      name: workoutName,
      exercises: selectedExerciseIds,
    };

    try {
      await firebase
        .firestore()
        .collection("Workouts")
        .doc(workoutId)
        .update(workoutData);
      alert("Workout updated successfully!");
    } catch (error) {
      console.log("Error updating workout:", error);
    }
  };

  const confirmDeleteWorkout = () => {
    Alert.alert(
      "Delete Workout",
      `Are you sure you want to delete this workout "${workoutName}"?`,
      [
        {
          text: "Yes",
          onPress: deleteWorkout,
        },
        {
          text: "No",
          onPress: () => {
            alert(`Workout "${workoutName}" was not deleted`);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deleteWorkout = async () => {
    try {
      await firebase.firestore().collection("Workouts").doc(workoutId).delete();
      alert(`Workout "${workoutName}" was deleted successfully!`);
      navigation.goBack();
    } catch (error) {
      console.log("Error deleting workout:", error);
    }
  };

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ModalMenu />
      <Text style={styles(isDarkMode).field}>Workout Name:</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField("workoutName")}
        value={workoutName}
        onChangeText={setWorkoutName}
        onFocus={() => setActiveInput("workoutName")}
        onBlur={() => setActiveInput(null)}
      />
      <Text style={styles(isDarkMode).field}>Exercises:</Text>
      <ScrollView>
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles(isDarkMode).exerciseItem}>
            <Switch
              value={selectedExercises[exercise.id] || false}
              onValueChange={() => toggleExerciseSelection(exercise.id)}
            />
            <Text style={styles(isDarkMode).exerciseName}>{exercise.name}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles(isDarkMode).updateWorkoutButton}
        onPress={updateWorkout}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ ...styles(isDarkMode).buttonText, color: "#1463F3" }}>
            Update Workout
          </Text>
          <MaterialIcons
            name="check"
            size={24}
            color="#1463F3"
            style={{ marginLeft: 5 }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditWorkout;
