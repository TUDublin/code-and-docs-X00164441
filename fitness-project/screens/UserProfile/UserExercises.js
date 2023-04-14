import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { firebase } from '../../firebase/config';
import { useRoute, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  field: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
  },
  addExercisesButton: {
    backgroundColor: "#46C263",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#5897EE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default function UserWorkouts() {
  const [name, setName] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.field}>Exercise Name:</Text>
      <TextInput
        style={styles.inputField}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.field}>Body Part:</Text>
      <TextInput
        style={styles.inputField}
        value={bodyPart}
        onChangeText={setBodyPart}
      />
      <Text style={styles.field}>Image URL:</Text>
      <TextInput
        style={styles.inputField}
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TouchableOpacity style={styles.addExercisesButton} onPress={addExercise}>
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToWorkouts}>
        <Text style={styles.buttonText}>Create Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}