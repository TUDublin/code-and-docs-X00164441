import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native";
import { DarkModeContext } from "../../DarkModeContext";

const styles = (isDarkMode) =>
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
    inputField: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      padding: 10,
      marginVertical: 5,
      width: "100%",
      borderRadius: 5,
      backgroundColor: isDarkMode ? "#3b3b3b" : "white",
      color: isDarkMode ? "white" : "black",
    },
    createWorkoutButton: {
      backgroundColor: isDarkMode ? "#003d99" : "#46C263",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    button: {
      backgroundColor: isDarkMode ? "#525252" : "#5897EE",
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
  });

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({});
  const navigation = useNavigation();
  const { isDarkMode } = useContext(DarkModeContext);

  const navigateToWorkoutList = () => {
    navigation.navigate("WorkoutList");
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Exercises")
      .onSnapshot((querySnapshot) => {
        const exercisesData = [];
        querySnapshot.forEach((doc) => {
          const exercise = doc.data();
          exercise.id = doc.id;
          exercisesData.push(exercise);
        });
        setExercises(exercisesData);
      });

    return () => unsubscribe();
  }, []);

  const toggleExerciseSelection = (exerciseId) => {
    setSelectedExercises((prevState) => ({
      ...prevState,
      [exerciseId]: !prevState[exerciseId],
    }));
  };

  const createWorkout = async () => {
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
      const docRef = await firebase
        .firestore()
        .collection("Workouts")
        .add(workoutData);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Workout created successfully!");
            alert(
              `Workout created successfully!\nWorkout Name: ${workoutName}`
            );
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      setWorkoutName("");
      setSelectedExercises({});
    } catch (error) {
      console.log("Error creating workout:", error);
    }
  };

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <Text style={styles(isDarkMode).field}>Workout Name:</Text>
      <TextInput
        style={styles(isDarkMode).inputField}
        value={workoutName}
        onChangeText={setWorkoutName}
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
        style={styles(isDarkMode).createWorkoutButton}
        onPress={createWorkout}
      >
        <Text style={styles(isDarkMode).buttonText}>Create Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles(isDarkMode).button}
        onPress={navigateToWorkoutList}
      >
        <Text style={styles(isDarkMode).buttonText}>Edit Workouts</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateWorkout;
