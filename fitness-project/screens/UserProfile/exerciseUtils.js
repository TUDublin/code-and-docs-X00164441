// exerciseUtils.js

import { firebase } from "../../firebase/config";

export const getExercises = async (limit) => {
  const userId = firebase.auth().currentUser.uid;

  try {
    const querySnapshot = await firebase
      .firestore()
      .collection("Exercises")
      .where("userId", "==", userId)
      .limit(limit)
      .get();

    const exercises = [];
    querySnapshot.forEach((doc) => {
      const exercise = doc.data();
      exercise.id = doc.id;
      exercises.push(exercise);
    });

    return exercises;
  } catch (error) {
    console.error("Error fetching exercises: ", error);
    return [];
  }
};