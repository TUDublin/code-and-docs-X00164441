import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";
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
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      color: isDarkMode ? "white" : "black",
    },
    field: {
      marginVertical: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      padding: 10,
      marginVertical: 5,
      width: "100%",
      borderRadius: 5,
      backgroundColor: isDarkMode ? "#3b3b3b" : "white",
      color: isDarkMode ? "white" : "black",
    },
    buttonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 20,
    },
    saveChangesButton: {
      backgroundColor: isDarkMode ? "#003d99" : "#46C263",
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 5,
      width: "30%",
      marginTop: 20,
      marginBottom: 10,
    },
    button: {
      backgroundColor: isDarkMode? "#525252" :"#5897EE",
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
      width: "30%",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
 
  });

export default function UserScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [sex, setSex] = useState("");
  const navigation = useNavigation();

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const darkModeButton = (
    <TouchableOpacity
      onPress={toggleDarkMode}
      style={{ position: "absolute", top: 40, right: 20 }}
    >
      <MaterialIcons
        name={isDarkMode ? "lightbulb-outline" : "lightbulb"}
        size={24}
        color={isDarkMode ? "white" : "black"}
      />
    </TouchableOpacity>
  );

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const navigateToExercises = () => {
    navigation.navigate("Exercises");
  };

  const navigateToViewExercises = () => {
    navigation.navigate("ViewExercises");
  };

  const navigateToCreateWorkout = () => {
    navigation.navigate("CreateWorkout");
  };

  const navigateToWorkoutList = () => {
    navigation.navigate("WorkoutList");
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        const userRef = firebase
          .firestore()
          .collection("users")
          .where("id", "==", uid);

        userRef
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              console.log("No user document found for UID:", uid);
              return;
            }

            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              console.log(userData);
              setFullName(userData.fullName);
              setEmail(userData.email);
              setAge(userData.age);
              setLocation(userData.location);
              setSex(userData.sex);
            });
          })
          .catch((error) => {
            console.log("Error getting user document:", error);
          });
      } else {
        // User is not signed in
        // Redirect to login page or display an error message
      }
    });

    return unsubscribe;
  }, []);

  const saveChanges = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase
        .firestore()
        .collection("users")
        .where("id", "==", user.uid)
        .limit(1);

      // Validate sex field
      if (sex !== "Male" && sex !== "Female") {
        alert("Please enter 'Male' or 'Female' for sex field.");
        console.log("Invalid sex input:", sex);
        return;
      }

      // Validate birthday field
      if (age < 1 || age > 120) {
        alert("Please enter a valid age between 0 and 120.");
        console.log("Invalid birthday input:", age);
        return;
      }

      userRef
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("No user document found for UID:", user.uid);
            return;
          }

          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const updatedFields = [];

            if (fullName !== userData.fullName) {
              updatedFields.push(
                `Changed full name from ${userData.fullName} to ${fullName}`
              );
            }
            if (email !== userData.email) {
              updatedFields.push(
                `Changed email from ${userData.email} to ${email}`
              );
            }
            if (age !== userData.age) {
              updatedFields.push(`Changed age from ${userData.age} to ${age}`);
            }
            if (location !== userData.location) {
              updatedFields.push(
                `Changed location from ${userData.location} to ${location}`
              );
            }
            if (sex !== userData.sex) {
              updatedFields.push(`Changed sex from ${userData.sex} to ${sex}`);
            }

            doc.ref
              .update({
                fullName: fullName || userData.fullName,
                email: email || userData.email,
                age: age || userData.age,
                location: location || userData.location,
                sex: sex || userData.sex,
              })
              .then(() => {
                console.log("User data updated successfully!");
                alert(
                  `Your user details have updated successfully!\n${updatedFields.join(
                    ", "
                  )}.`
                );
              })
              .catch((error) => {
                console.log("Error updating user data:", error);
              });
          });
        })
        .catch((error) => {
          console.log("Error getting user document:", error);
        });
    }
  };

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      {darkModeButton}
      <Text style={styles(isDarkMode).title}>Hello, {fullName}</Text>
      <Text style={styles(isDarkMode).field}>Full Name:</Text>
      <TextInput
        style={styles(isDarkMode).input}
        value={fullName}
        onChangeText={setFullName}
      />
      <Text style={styles(isDarkMode).field}>Email:</Text>
      <TextInput
        style={styles(isDarkMode).input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles(isDarkMode).field}>Age:</Text>
      <TextInput
        style={styles(isDarkMode).input}
        value={age}
        onChangeText={setAge}
      />
      <Text style={styles(isDarkMode).field}>Location:</Text>
      <TextInput
        style={styles(isDarkMode).input}
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles(isDarkMode).field}>Sex:</Text>
      <TextInput
        style={styles(isDarkMode).input}
        value={sex}
        onChangeText={setSex}
      />

      <TouchableOpacity
        style={styles(isDarkMode).saveChangesButton}
        onPress={saveChanges}
      >
        <Text style={styles(isDarkMode).buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <View style={styles(isDarkMode).buttonContainer}>
        <TouchableOpacity
          style={styles(isDarkMode).button}
          onPress={navigateToHome}
        >
          <Text style={styles(isDarkMode).buttonText}>Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles(isDarkMode).button}
          onPress={navigateToExercises}
        >
          <Text style={styles(isDarkMode).buttonText}>Add Exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles(isDarkMode).button}
          onPress={navigateToViewExercises}
        >
          <Text style={styles(isDarkMode).buttonText}>View Exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles(isDarkMode).button}
          onPress={navigateToCreateWorkout}
        >
          <Text style={styles(isDarkMode).buttonText}>Create Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles(isDarkMode).button}
          onPress={navigateToWorkoutList}
        >
          <Text style={styles(isDarkMode).buttonText}>Edit/View Workouts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
