import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseItem: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "100%",
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ViewWorkout = () => {
  const route = useRoute();
  const { workoutId } = route.params;
  const [workoutData, setWorkoutData] = useState({});
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const getExercisesData = async () => {
        const workoutDoc = await firebase
          .firestore()
          .collection("Workouts")
          .doc(workoutId)
          .get();
      
        const fetchedWorkoutData = workoutDoc.data();
        setWorkoutData(fetchedWorkoutData);
      
        const exercisePromises = fetchedWorkoutData.exercises.map(async (exerciseId) => {
          const exerciseDoc = await firebase
            .firestore()
            .collection("Exercises")
            .doc(exerciseId)
            .get();
      
          if (exerciseDoc.exists) {
            const exerciseData = exerciseDoc.data();
            exerciseData.id = exerciseDoc.id;
            return exerciseData;
          }
          return null;
        });
      
        const exercisesData = (await Promise.all(exercisePromises)).filter((exercise) => exercise !== null);
        setExercises(exercisesData);
      };
    getExercisesData();
  }, [workoutId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.workoutName}>{workoutData.name}</Text>
      <ScrollView>
      {exercises.map((exercise) => (
  <View key={exercise.id} style={styles.exerciseItem}>
    <Text style={styles.exerciseName}>{exercise.name}</Text>
  </View>
))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewWorkout;