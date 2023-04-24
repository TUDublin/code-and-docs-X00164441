import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
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
      paddingTop: 30,
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
    createWorkoutButton: {
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
      marginBottom: 15,
    },
    exerciseName: {
      fontSize: 16,
      marginRight: 10,
      paddingLeft: 5,
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

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({});
  const navigation = useNavigation();
  const { isDarkMode } = useContext(DarkModeContext);
  const currentUser = firebase.auth().currentUser;
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
              onPress={navigateToProfilePage}
            >
              <Text style={styles(isDarkMode).navmodalbuttonText}>
                Profile Page
              </Text>
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
    if (!currentUser) return;

    const unsubscribe = firebase
      .firestore()
      .collection("Exercises")
      .where("userId", "==", currentUser.uid)
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
  }, [currentUser]);

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
      userId: firebase.auth().currentUser.uid,
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
      <ModalMenu />
      <Text style={styles(isDarkMode).field}>Workout Name:</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField("workoutName")}
        value={workoutName}
        onChangeText={setWorkoutName}
        onFocus={() => setActiveInput("workoutName")}
        onBlur={() => setActiveInput(null)}
        clearButtonMode="always" 
      />
      <Text style={styles(isDarkMode).field}>Exercises:</Text>
      <ScrollView>
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles(isDarkMode).exerciseItem}>
            <Switch
              value={selectedExercises[exercise.id] || false}
              onValueChange={() => toggleExerciseSelection(exercise.id)}
              trackColor={{ false: 'gray', true: '#1463F3' }}
            />
            <Text style={styles(isDarkMode).exerciseName}>{exercise.name}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles(isDarkMode).createWorkoutButton}
        onPress={createWorkout}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ ...styles(isDarkMode).buttonText, color: "#1463F3" }}>
            Create Workout
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

export default CreateWorkout;
