import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
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
    workoutItem: {
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: "100%",
    },
    workoutName: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
      borderRadius: 10,
      padding: 20,
      width: "90%",
    },
  });

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exerciseNames, setExerciseNames] = useState([]);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(DarkModeContext);

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

  const showWorkoutInfo = async (workout) => {
    setSelectedWorkout(workout);
  
    const fetchedExerciseNames = await Promise.all(
      workout.exercises.map(async (exerciseId) => {
        const exerciseDoc = await firebase
          .firestore()
          .collection("Exercises")
          .doc(exerciseId)
          .get();
        const exerciseData = exerciseDoc.data();
        return exerciseData ? exerciseData.name : `Missing exercise (${exerciseId})`;
      })
    );
  
    setExerciseNames(fetchedExerciseNames);
    setModalVisible(true);
  };

  const handleWorkoutPress = (workout) => {
    Alert.alert("Options", "View or Edit Workout", [
      {
        text: "View",
        onPress: () => showWorkoutInfo(workout),
      },
      {
        text: "Edit",
        onPress: () =>
          navigation.navigate("EditWorkout", { workoutId: workout.id }),
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ScrollView>
        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles(isDarkMode).workoutItem}
            onPress={() => handleWorkoutPress(workout)}
          >
            <Text style={styles(isDarkMode).workoutName}>{workout.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles(isDarkMode).modalContainer}>
          <View style={styles(isDarkMode).modalContent}>
            {selectedWorkout && (
              <>
                <Text style={styles(isDarkMode).workoutName}>
                  Workout: {selectedWorkout.name}
                </Text>
                <Text>Exercises:</Text>
                {exerciseNames.map((exerciseName, index) => (
                  <Text key={index}>- {exerciseName}</Text>
                ))}
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WorkoutList;
