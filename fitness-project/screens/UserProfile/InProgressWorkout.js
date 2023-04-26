import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DarkModeContext } from "../../DarkModeContext";
import { MaterialIcons } from "@expo/vector-icons";

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
      width: "100%",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
      color: isDarkMode ? "white" : "black",
    },
    timer: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: isDarkMode ? "white" : "black",
    },
    workoutHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    workoutName: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    timerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    exerciseItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: Dimensions.get("window").width - 40,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    repSetContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: 100,
      justifyContent: "space-between",
    },
    repSetText: {
      color: isDarkMode ? "white" : "black",
      fontSize: 16,
      marginRight: 5,
    },
    repSetInput: {
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
      color: isDarkMode ? "white" : "black",
      borderColor: isDarkMode ? "white" : "black",
      borderWidth: 1,
      width: 30,
      textAlign: "center",
    },
    checkIcon: {
      marginLeft: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    restTimerModalContent: {
      backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
      borderRadius: 10,
      padding: 20,
      width: "90%",
    },
    restTimerText: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: isDarkMode ? "white" : "black",
    },
    restTimerControl: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: 20,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      paddingHorizontal: 20,
      alignSelf: "center",
      marginTop: 20,
      marginLeft: 20,
      marginBottom: 10,
    },
    buttonText: {
      color: isDarkMode ? "#1463F3" : "#1463F3",
      fontSize: 16,
      fontWeight: "bold",
    },
    exerciseRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: Dimensions.get("window").width - 40,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
      flex: 1,
    },
    repSetContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      justifyContent: "flex-end",
    },
    repSetText: {
      color: isDarkMode ? "white" : "black",
      fontSize: 16,
      marginRight: 5,
    },
    repSetInput: {
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
      color: isDarkMode ? "white" : "black",
      borderColor: isDarkMode ? "white" : "black",
      borderWidth: 1,
      width: 30,
      textAlign: "center",
    },
    checkIcon: {
      marginLeft: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    restTimerModalContent: {
      backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
      borderRadius: 10,
      padding: 20,
      width: "90%",
    },
    restTimerText: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: isDarkMode ? "white" : "black",
    },
    restTimerControl: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20,
    },
  });

const RestModal = ({
  restModalVisible,
  restTimer,
  incrementRestTimer,
  decrementRestTimer,
  handleRestTimerCompletion,
  isDarkMode,
}) => {
  return (
    <Modal visible={restModalVisible} transparent={true} animationType="slide">
      <View style={styles(isDarkMode).modalContainer}>
        <View style={styles(isDarkMode).restTimerModalContent}>
          <Text style={styles(isDarkMode).restTimerText}>
            Rest Time: {restTimer}s
          </Text>
          <View style={styles(isDarkMode).restTimerControl}>
            <TouchableOpacity onPress={decrementRestTimer}>
              <MaterialIcons
                name="remove"
                size={24}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={incrementRestTimer}>
              <MaterialIcons
                name="add"
                size={24}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleRestTimerCompletion}
            style={styles(isDarkMode).button}
          >
            <Text style={styles(isDarkMode).buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Exercise = ({
  exercise,
  index,
  isDarkMode,
  handleExerciseCompletion,
  handleChangeRepsSets,
}) => {
  return (
    <View style={styles(isDarkMode).exerciseRow}>
      <Text style={styles(isDarkMode).exerciseName}>{exercise.name}</Text>
      <View style={styles(isDarkMode).repSetContainer}>
        <Text style={styles(isDarkMode).repSetText}>Reps:</Text>
        <TextInput
          style={styles(isDarkMode).repSetInput}
          keyboardType="number-pad"
          value={exercise.reps.toString()}
          onChangeText={(text) => handleChangeRepsSets(index, "reps", text)}
        />
        <Text style={styles(isDarkMode).repSetText}>Sets:</Text>
        <TextInput
          style={styles(isDarkMode).repSetInput}
          keyboardType="number-pad"
          value={exercise.sets.toString()}
          onChangeText={(text) => handleChangeRepsSets(index, "sets", text)}
        />
      </View>
      <TouchableOpacity onPress={() => handleExerciseCompletion(index)}>
        <MaterialIcons
          name={exercise.completed ? "check-circle" : "check-circle-outline"}
          size={24}
          color={isDarkMode ? "white" : "black"}
          style={styles(isDarkMode).checkIcon}
        />
      </TouchableOpacity>
      </View>
  );
};

const InProgressWorkout = ({ route }) => {
  const [exercises, setExercises] = useState([]);
  const [restModalVisible, setRestModalVisible] = useState(false);
  const [restTimerCompleted, setRestTimerCompleted] = useState(false);
  const [restTimer, setRestTimer] = useState(30);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const { workoutId, workoutName } = route.params;
  const [workout, setWorkout] = useState(null);

  const { isDarkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();

  const incrementRestTimer = () => {
    setRestTimer((prevTimer) => prevTimer + 5);
  };

  const decrementRestTimer = () => {
    if (restTimer > 0) {
      setRestTimer((prevTimer) => prevTimer - 5);
    }
  };

  const toggleTimer = () => {
    setTimerRunning((prevRunning) => !prevRunning);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
        setRestTimer((prevTimer) => Math.max(prevTimer - 1, 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (restTimerCompleted) {
      setRestModalVisible(false);
    }
  }, [restTimerCompleted]);

  useEffect(() => {
    const fetchWorkout = async () => {
      const workoutDoc = await firebase
        .firestore()
        .collection("Workouts")
        .doc(workoutId)
        .get();
      const workoutData = workoutDoc.data();
      setWorkout(workoutData);
    };
    fetchWorkout();
  }, [workoutId]);

  useEffect(() => {
    if (workout) {
      const fetchExercises = async () => {
        const fetchedExercises = await Promise.all(
          workout.exercises.map(async (exerciseId) => {
            const exerciseDoc = await firebase
              .firestore()
              .collection("Exercises")
              .doc(exerciseId)
              .get();
            const exerciseData = exerciseDoc.data();
            return {
              id: exerciseId,
              name: exerciseData
                ? exerciseData.name
                : `Missing exercise (${exerciseId})`,
              reps: 0,
              sets: 0,
              completed: false,
            };
          })
        );
        setExercises(fetchedExercises);
      };
      fetchExercises();
    }
  }, [workout]);

  const handleExerciseCompletion = (exerciseIndex) => {
    setExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[exerciseIndex].completed =
        !updatedExercises[exerciseIndex].completed;
      return updatedExercises;
    });

    setRestTimer(30);
    setRestModalVisible(true);
  };

  const handleRestTimerCompletion = () => {
    setRestModalVisible(false);
    setRestTimer(30);
  };

  const handleChangeRepsSets = (exerciseIndex, field, value) => {
    setExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[exerciseIndex][field] = parseInt(value, 10) || 0;
      return updatedExercises;
    });
  };

  const handleFinishWorkout = async () => {
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;
    const completedWorkoutsRef = firebase
      .firestore()
      .collection("CompletedWorkouts");

    const completedWorkout = {
      userId: uid,
      workoutName: workoutName,

      elapsedTime,
      exercises: exercises.map((exercise) => ({
        exerciseId: exercise.id,
        name: exercise.name,
        reps: exercise.reps,
        sets: exercise.sets,
      })),
    };

    await completedWorkoutsRef.add(completedWorkout);
    navigation.navigate("WorkoutList");
  };

  return (
    <SafeAreaView style={[styles(isDarkMode).container]}>
      <ScrollView style={styles(isDarkMode).content}>
        <Text style={styles(isDarkMode).title}>{workoutName}</Text>
        <Text style={styles(isDarkMode).timer}>
          Elapsed Time: {formatTime(elapsedTime)}
        </Text>
        {exercises.map((exercise, index) => (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            index={index}
            isDarkMode={isDarkMode}
            handleExerciseCompletion={handleExerciseCompletion}
            handleChangeRepsSets={handleChangeRepsSets}
          />
        ))}
      </ScrollView>
      <View style={styles(isDarkMode).buttonContainer}>
        <TouchableOpacity
          onPress={toggleTimer}
          style={styles(isDarkMode).button}
        >
          <Text style={styles(isDarkMode).buttonText}>
            {timerRunning ? "Pause" : "Resume"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFinishWorkout}
          style={styles(isDarkMode).button}
        >
          <Text style={styles(isDarkMode).buttonText}>Finish Workout</Text>
        </TouchableOpacity>
      </View>
      <RestModal
        restModalVisible={restModalVisible}
        restTimer={restTimer}
        incrementRestTimer={incrementRestTimer}
        decrementRestTimer={decrementRestTimer}
        handleRestTimerCompletion={handleRestTimerCompletion}
        isDarkMode={isDarkMode}
      />
    </SafeAreaView>
  );
};

export default InProgressWorkout;
