import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Circle } from "react-native-svg";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { firebase } from "../../firebase/config";
import { DarkModeContext } from "../../DarkModeContext";
import { useNavigation } from "@react-navigation/native";
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
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      padding: 10,
      marginBottom: 10,
      width: "100%",
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      color: isDarkMode ? "white" : "black",
    },
    button: {
      backgroundColor: "#2196F3",
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
    historyItem: {
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: "100%",
    },
    historyText: {
      color: isDarkMode ? "white" : "black",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkMode
        ? "rgba(0, 0, 0, 0.7)"
        : "rgba(255, 255, 255, 0.7)",
    },
    modalView: {
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      width: "80%",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: isDarkMode ? "white" : "black",
    },
    modalButtons: {
      marginTop: 20,
      justifyContent: "space-between",
      width: "100%",
    },
    cancelButton: {
      backgroundColor: "red",
      padding: 10,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 5,
      width: "100%",
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

const WeightTracker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const [newWeight, setNewWeight] = useState("");
  const [weight, setWeight] = useState("");
  const [measurements, setMeasurements] = useState([]);
  const [navmodalVisible, setnavModalVisible] = useState(false);
  const navigation = useNavigation();
  const userId = firebase.auth().currentUser.uid;
  const { isDarkMode } = useContext(DarkModeContext);

  const navigateToDashboard = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("Dashboard");
  };

  const navigateToWorkoutHistory = () => {
    setnavModalVisible(!navmodalVisible);
    navigation.navigate("WorkoutHistory");
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
                  Manage Workouts
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToWorkoutHistory}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="history"
                  size={18}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Workout History
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
    const unsubscribe = firebase
      .firestore()
      .collection("Measurements")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const measurementsData = [];
        querySnapshot.forEach((doc) => {
          const measurement = doc.data();
          measurement.id = doc.id;
          measurementsData.push(measurement);
        });
        setMeasurements(measurementsData);
      });

    return () => unsubscribe();
  }, []);

  const addWeightMeasurement = () => {
    if (isNaN(weight) || weight === "") {
      alert("Please enter a valid weight.");
      return;
    }

    const createdAt = new Date();
    const newMeasurement = {
      weight: parseFloat(weight),
      createdAt: createdAt,
      userId: userId,
    };

    firebase
      .firestore()
      .collection("Measurements")
      .add(newMeasurement)
      .then(() => {
        setWeight("");
      })
      .catch((error) => {
        console.error("Error adding measurement: ", error);
      });
  };

  const last30DaysMeasurements = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today - 30 * 24 * 60 * 60 * 1000);
    return measurements.filter(
      (measurement) =>
        measurement.createdAt.toDate() >= thirtyDaysAgo &&
        measurement.createdAt.toDate() <= today
    );
  };

  const graphData = last30DaysMeasurements().map(
    (measurement) => measurement.weight
  );

  const xAxisLabels = last30DaysMeasurements().map((measurement) =>
    measurement.createdAt
      .toDate()
      .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
  );

  const deleteMeasurement = (measurement) => {
    firebase
      .firestore()
      .collection("Measurements")
      .doc(measurement.id)
      .delete()
      .then(() => {
        Alert.alert(
          "Success",
          `Your weight entry ${measurement.weight}kg has been successfully deleted!`
        );
      })
      .catch((error) => {
        console.error("Error deleting measurement: ", error);
      });
  };

  const confirmDelete = (measurement) => {
    Alert.alert(
      "Are you sure you want to delete your weight entry?",
      `Weight: ${measurement.weight}kg`,
      [
        { text: "Yes", onPress: () => deleteMeasurement(measurement) },
        { text: "No", style: "cancel" },
      ]
    );
  };

  const updateMeasurement = () => {
    if (isNaN(newWeight) || newWeight === "") {
      alert("Please enter a valid weight.");
      return;
    }

    const oldWeight = selectedMeasurement.weight;
    firebase
      .firestore()
      .collection("Measurements")
      .doc(selectedMeasurement.id)
      .update({ weight: parseFloat(newWeight) })
      .then(() => {
        setModalVisible(false);
        setNewWeight("");
        setSelectedMeasurement(null);
        Alert.alert(
          "Success",
          `Your weight entry has been successfully updated! \nChanged weight from ${oldWeight}kg to ${newWeight}kg`
        );
      })
      .catch((error) => {
        console.error("Error updating measurement: ", error);
      });
  };

  const openEditModal = (measurement) => {
    setSelectedMeasurement(measurement);
    setNewWeight(measurement.weight.toString());
    setModalVisible(true);
  };

  const handleLongPress = (measurement) => {
    Alert.alert("Choose an action", "", [
      { text: "Edit", onPress: () => openEditModal(measurement) },
      {
        text: "Delete",
        onPress: () => confirmDelete(measurement),
        style: "destructive",
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const Decorator = ({ x, y }) => {
    return graphData.map((value, index) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke={isDarkMode ? "white" : "black"}
        fill={isDarkMode ? "white" : "black"}
      />
    ));
  };

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ModalMenu />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles().centeredView}>
            <View style={styles().modalView}>
              <Text style={styles().modalTitle}>Edit Weight Entry</Text>
              <TextInput
                style={styles(isDarkMode).input}
                placeholder="Enter new weight in KG"
                placeholderTextColor={isDarkMode ? "white" : "black"}
                onChangeText={(text) => setNewWeight(text)}
                value={newWeight}
                keyboardType="numeric"
              />
              <View style={styles().modalButtons}>
                <TouchableOpacity
                  onPress={updateMeasurement}
                  style={styles().button}
                >
                  <Text style={styles().buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles().cancelButton}
                >
                  <Text style={styles().buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TextInput
        style={styles(isDarkMode).input}
        placeholder="Enter weight in KG"
        placeholderTextColor={isDarkMode ? "white" : "black"}
        onChangeText={(text) => setWeight(text)}
        value={weight}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={addWeightMeasurement} style={styles().button}>
        <Text style={styles().buttonText}>Add Weight</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, width: "90%" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <YAxis
            data={graphData}
            contentInset={{ top: 30, bottom: 30 }}
            svg={{ fill: isDarkMode ? "white" : "black" }}
            numberOfTicks={5}
            formatLabel={(value) => `${value}kg`}
          />
          <LineChart
            style={{ flex: 1 }}
            data={graphData}
            svg={{ stroke: "rgb(134, 65, 244)" }}
            contentInset={{ top: 30, bottom: 30 }}
            curve={shape.curveNatural}
          >
            <Grid />
            <Decorator />
          </LineChart>
        </View>
        <XAxis
          data={graphData}
          formatLabel={(index) => xAxisLabels[index]}
          contentInset={{ left: 20, right: 20 }}
          svg={{ fill: isDarkMode ? "white" : "black" }}
        />
        <ScrollView style={{ flex: 1 }}>
          {measurements.map((measurement) => (
            <TouchableOpacity
              key={measurement.id}
              style={styles(isDarkMode).historyItem}
              onLongPress={() => handleLongPress(measurement)}
            >
              <Text style={styles(isDarkMode).historyText}>
                {measurement.createdAt.toDate().toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                : {measurement.weight}kg
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WeightTracker;
