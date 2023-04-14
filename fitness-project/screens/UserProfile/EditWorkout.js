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
  Alert,
  Button,
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
  updateWorkoutButton: {
    backgroundColor: "#46C263",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteWorkoutButton: {
    backgroundColor: "#FC3D39",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#5897EE",
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
      <TouchableOpacity
        style={styles.updateWorkoutButton}
        onPress={updateWorkout}
      >
        <Text style={styles.buttonText}>Update Workout</Text>
      </TouchableOpacity>
      <View style={styles.deleteWorkoutButton}>
        <Button
          title="Delete Workout"
          color="white"
          onPress={confirmDeleteWorkout}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditWorkout;
