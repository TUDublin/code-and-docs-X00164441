import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Switch } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  field: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    width: "100%",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "blue",
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
  },
});

const EditWorkout = ({ route, navigation }) => {
  const { workoutId } = route.params;
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({});

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

    const unsubscribeExercises = firebase
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
      console.log("Workout updated successfully");
      navigation.goBack();
    } catch (error) {
      console.log("Error updating workout:", error);
    }
  };
  const deleteWorkout = async () => {
    try {
      await firebase.firestore().collection("Workouts").doc(workoutId).delete();
      console.log("Workout deleted successfully");
      navigation.goBack();
    } catch (error) {
      console.log("Error deleting workout:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.field}>Workout Name:</Text>
      <TextInput
        style={styles.inputField}
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      <Text style={styles.field}>Exercises:</Text>
      <ScrollView>
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseItem}>
            <Switch
              value={selectedExercises[exercise.id] || false}
              onValueChange={() => toggleExerciseSelection(exercise.id)}
            />
            <Text style={styles.exerciseName}>{exercise.name}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={updateWorkout}>
        <Text style={styles.buttonText}>Update Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={deleteWorkout}>
        <Text style={styles.buttonText}>Delete Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditWorkout;
