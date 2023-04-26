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
  Dimensions
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { DarkModeContext } from "../../DarkModeContext";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
    },
    exerciseItem: {
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
    picker: {
      width: "100%",
      marginBottom: 10,
      color: isDarkMode ? "white" : "black",
    },
    filterTitle: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 0,
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

const ViewExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("All");
  const navigation = useNavigation();
  const userId = firebase.auth().currentUser.uid;
  const { isDarkMode } = useContext(DarkModeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [navmodalVisible, setnavModalVisible] = useState(false);

  const navigateToDashboard = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("Dashboard");
  };

  const navigateToExercises = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("Exercises");
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
              onPress={navigateToWorkoutList}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="view-headline"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                Manage Workouts
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToExercises}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="edit"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Add Exercises
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
    const userId = firebase.auth().currentUser.uid;

    const unsubscribe = firebase
      .firestore()
      .collection("Exercises")
      .where("userId", "==", userId) // Filter exercises by the current user's UID
      .onSnapshot((querySnapshot) => {
        const exercisesData = [];
        const bodyPartsData = [];
        querySnapshot.forEach((doc) => {
          const exercise = doc.data();
          exercise.id = doc.id;
          exercisesData.push(exercise);
          if (!bodyPartsData.includes(exercise.bodyPart)) {
            bodyPartsData.push(exercise.bodyPart);
          }
        });
        setExercises(exercisesData);
        setFilteredExercises(exercisesData);
        setBodyParts(["All", ...bodyPartsData]);
      });

    return () => unsubscribe();
  }, []);

  const confirmDeleteExercise = (exercise) => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        {
          text: "Yes",
          onPress: () => deleteExercise(exercise),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const deleteExercise = (exercise) => {
    firebase
      .firestore()
      .collection("Exercises")
      .doc(exercise.id)
      .delete()
      .then(() => {
        setExercises(exercises.filter((item) => item.id !== exercise.id));
        filterExercises(selectedBodyPart);
        Alert.alert(
          "Exercise Deleted",
          `Exercise: ${exercise.name}\nBody Part: ${exercise.bodyPart}\n has been successfully deleted!`
        );
      })
      .catch((error) => {
        console.error("Error deleting exercise: ", error);
      });
  };

  const filterExercises = (itemValue) => {
    setSelectedBodyPart(itemValue);
    if (itemValue === "All") {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(
        exercises.filter((exercise) => exercise.bodyPart === itemValue)
      );
    }
  };

  const showExerciseInfo = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getExercises = async (limit) => {
    const userId = firebase.auth().currentUser.uid;
    const exercisesData = [];

    await firebase
      .firestore()
      .collection("Exercises")
      .where("userId", "==", userId)
      .limit(limit)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const exercise = doc.data();
          exercise.id = doc.id;
          exercisesData.push(exercise);
        });
      });

    return exercisesData;
  };

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ModalMenu />
      <Text style={styles(isDarkMode).filterTitle}>Filter by body part</Text>
      <Picker
        selectedValue={selectedBodyPart}
        style={styles(isDarkMode).picker}
        onValueChange={(itemValue) => filterExercises(itemValue)}
        itemStyle={{ color: isDarkMode ? "white" : "black" }}
      >
        {bodyParts.map((bodyPart, index) => (
          <Picker.Item key={index} label={bodyPart} value={bodyPart} />
        ))}
      </Picker>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles(isDarkMode).modalContainer}>
          <View style={styles(isDarkMode).modalContent}>
            {selectedExercise && (
              <>
                <Text style={styles(isDarkMode).exerciseName}>
                  Name: {selectedExercise.name}
                </Text>
                <Text style={{ color: isDarkMode ? "white" : "black" }}>
                  Body Part: {selectedExercise.bodyPart}
                </Text>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={closeModal}
                >
                  <Text style={{ color: isDarkMode ? "white" : "black" }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <ScrollView>
        {filteredExercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles(isDarkMode).exerciseItem}
            onPress={() => showExerciseInfo(exercise)}
            onLongPress={() => confirmDeleteExercise(exercise)}
          >
            <Text style={styles(isDarkMode).exerciseName}>{exercise.name}</Text>
            <Text style={{ color: isDarkMode ? "white" : "black" }}>
              {exercise.bodyPart}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewExercises;