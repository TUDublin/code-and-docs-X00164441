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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  field: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    width: "100%",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "99%",
  },
  saveChangesButton: {
    backgroundColor: "#46C263",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "30%",
    marginTop: 20,
    marginBottom: 150
  },
  button: {
    backgroundColor: "#5897EE",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    width: "30%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  editContainer: {
    flexDirection: "row",
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
});

export default function UserScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [sex, setSex] = useState("");
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const navigateToExercises = () => {
    navigation.navigate("Exercises");
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello, {fullName}</Text>
      <Text style={styles.field}>Full Name:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <Text style={styles.field}>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.field}>Age:</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} />
      <Text style={styles.field}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.field}>Sex:</Text>
      <TextInput style={styles.input} value={sex} onChangeText={setSex} />

      <TouchableOpacity style={styles.saveChangesButton} onPress={saveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToExercises}>
          <Text style={styles.buttonText}>Add Exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToWorkoutList}>
          <Text style={styles.buttonText}>Edit Workouts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
