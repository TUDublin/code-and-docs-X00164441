import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { firebase } from '../../firebase/config';
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
    field: {
      marginVertical: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    inputField: {
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
    addExercisesButton: {
      backgroundColor: isDarkMode ? "#003d99" : "#46C263",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    button: {
      backgroundColor: isDarkMode? "#525252" :"#5897EE",
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
    filterButton: {
      backgroundColor: "#46C263",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    exerciseItem: {
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: "100%",
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
  });

export default function UserWorkouts() {
  const [name, setName] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  

  const navigateToWorkouts = () => {
    navigation.navigate("CreateWorkout");
  };

  const addExercise = () => {
    // Add this validation for Exercise Name and Body Part
    if (!name.trim() || !bodyPart.trim()) {
      alert("Please enter both Exercise Name and Body Part.");
      return;
    }
  
    const exerciseData = {
      name: name.trim(),
      bodyPart: bodyPart.trim(),
      userId: currentUser.uid,
    };
  
    firebase
      .firestore()
      .collection("Exercises")
      .add(exerciseData)
      .then(() => {
        console.log("Exercise added!");
        // Add this alert to show the exercise has been added successfully
        alert(
          `Exercise has been added successfully!\nExercise Name: ${name}\nBody Part: ${bodyPart}`
        );
        setName("");
        setBodyPart("");
      })
      .catch((error) => {
        console.log("Error adding exercise:", error);
      });
  };
  
 
  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <Text style={styles(isDarkMode).field}>Exercise Name:</Text>
      <TextInput
        style={styles(isDarkMode).inputField}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles(isDarkMode).field}>Body Part:</Text>
      <TextInput
        style={styles(isDarkMode).inputField}
        value={bodyPart}
        onChangeText={setBodyPart}
      />
      <Text style={styles(isDarkMode).field}>Image URL:</Text>
      <TextInput
        style={styles(isDarkMode).inputField}
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TouchableOpacity style={styles(isDarkMode).addExercisesButton} onPress={addExercise}>
        <Text style={styles(isDarkMode).buttonText}>Add Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles(isDarkMode).button} onPress={navigateToWorkouts}>
        <Text style={styles(isDarkMode).buttonText}>Create Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}