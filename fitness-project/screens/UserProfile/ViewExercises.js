import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    exerciseItem: {
      backgroundColor: "#e6e6e6",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: "100%",
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    picker: {
      width: "100%",
      marginBottom: 10,
    },
    filterTitle: {
    marginTop: 20,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 0,
    },
  });
  

const ViewExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("All");
  const navigation = useNavigation();
  const userId = firebase.auth().currentUser.uid;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Exercises")
      .where("userId", "==", userId)
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

  const showExerciseInfo = (exercise) => {
    Alert.alert(
      'Exercise Info',
      `Name: ${exercise.name}\nBody Part: ${exercise.bodyPart}`
    );
  };

  const confirmDeleteExercise = (exercise) => {
    Alert.alert(
      'Delete Exercise',
      'Are you sure you want to delete this exercise?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteExercise(exercise),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteExercise = (exercise) => {
    firebase
      .firestore()
      .collection('Exercises')
      .doc(exercise.id)
      .delete()
      .then(() => {
        setExercises(exercises.filter((item) => item.id !== exercise.id));
        filterExercises(selectedBodyPart);
        Alert.alert(
          'Exercise Deleted',
          `Exercise: ${exercise.name}\nBody Part: ${exercise.bodyPart}\n has been successfully deleted!`
        );
      })
      .catch((error) => {
        console.error('Error deleting exercise: ', error);
      });
  };

  const filterExercises = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    if (bodyPart === "All") {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(
        exercises.filter((exercise) => exercise.bodyPart === bodyPart)
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.filterTitle}>Filter by body part</Text>
      <Picker
        selectedValue={selectedBodyPart}
        style={styles.picker}
        onValueChange={(itemValue) => filterExercises(itemValue)}
      >
        {bodyParts.map((bodyPart, index) => (
          <Picker.Item key={index} label={bodyPart} value={bodyPart} />
        ))}
      </Picker>
      <ScrollView>
        {filteredExercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseItem}
            onPress={() => showExerciseInfo(exercise)}
            onLongPress={() => confirmDeleteExercise(exercise)}
          >
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text>{exercise.bodyPart}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewExercises;