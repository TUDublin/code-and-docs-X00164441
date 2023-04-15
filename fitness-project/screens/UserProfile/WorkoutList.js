import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  workoutItem: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "100%",
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Workouts")
      .onSnapshot((querySnapshot) => {
        const workoutsData = [];
        querySnapshot.forEach((doc) => {
          const workout = doc.data();
          workout.id = doc.id;
          workoutsData.push(workout);
        });
        setWorkouts(workoutsData);
      });

    return () => unsubscribe();
  }, []);

  const handleWorkoutPress = (workoutId) => {
    Alert.alert("Options", "View or Edit Workout", [
      {
        text: "View",
        onPress: () =>
          navigation.navigate("ViewWorkout", { workoutId: workoutId }),
      },
      {
        text: "Edit",
        onPress: () =>
          navigation.navigate("EditWorkout", { workoutId: workoutId }),
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.workoutItem}
            onPress={() => handleWorkoutPress(workout.id)}
          >
            <Text style={styles.workoutName}>{workout.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutList;
