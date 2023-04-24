import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { DarkModeContext } from "../../DarkModeContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import CaloriesBox from "../../components/CaloriesBox";
import ExerciseBox from "../../components/UserExercisesBox";
import WeightGraphBox from "../../components/WeightGraphBox";
import WorkoutList from "./WorkoutList";
import { getExercises } from "./exerciseUtils";

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
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

export default function Dashboard() {
  const [navmodalVisible, setnavModalVisible] = useState(false);
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const handleWorkoutPress = (workout) => {
    // You can define the behavior when a workout item is pressed in the Dashboard screen
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
              onPress={navigateToViewExercises}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="view-agenda"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  View Exercises
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
                  Edit/View Workouts
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
    const fetchExercises = async () => {
      const fetchedExercises = await getExercises(20);
      setExercises(fetchedExercises);
    };

    fetchExercises();
  }, []);

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
        <ModalMenu />
        <CaloriesBox />
        <Text style={styles(isDarkMode).title}>Your Exercises</Text>

        <View style={{ height: 210 }}>
          <ScrollView style={{ flex: 1 }}>
            {exercises.map((exercise) => (
              <ExerciseBox
                key={exercise.id}
                exercise={exercise}
                isDarkMode={isDarkMode}
              />
            ))}
          </ScrollView>
        </View>
        <Text style={styles(isDarkMode).title}>Your Workouts</Text>
        <WorkoutList onWorkoutPress={handleWorkoutPress} />
        <WeightGraphBox />
    </SafeAreaView>
  );
}
