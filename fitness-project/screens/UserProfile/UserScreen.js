import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";
import { DarkModeContext } from "../../DarkModeContext";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";

const styles = (isDarkMode, activeInput) =>
  StyleSheet.create({
    scrollcontainer: {
      paddingTop: 50,
      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
    },
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
    input: (inputName) => ({
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
    saveChangesButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      paddingHorizontal: 20,
      alignSelf: "center",
      marginTop: 20,
      marginLeft: 20,
      marginBottom: 10,
    },
    saveChangesText: {
      color: isDarkMode ? "#1463F3" : "#1463F3",
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    confirmdeleteAccountText: {
      color: isDarkMode ? "#a90505" : "#a90505",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
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

export default function UserScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [sex, setSex] = useState("");
  const navigation = useNavigation();
  const [navmodalVisible, setnavModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

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
              style={styles(isDarkMode).button}
              onPress={confirmDeleteAccount}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="delete"
                  size={18}
                  color={isDarkMode ? "#a90505" : "#a90505"}
                />
                <Text style={styles(isDarkMode).confirmdeleteAccountText}>
                  Delete Account
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
        color={isDarkMode ? "white" : "#1463F3"}
      />
    </TouchableOpacity>
  );

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Are you sure you want to delete your account?",
      "All data will be deleted",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "I'm sure",
          onPress: () =>
            Alert.alert(
              "This action is not reversible",
              "Do you wish to continue?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Continue",
                  onPress: async () => {
                    await deleteAccount(firebase.auth().currentUser);
                    Alert.alert(
                      "Account deletion successful",
                      `Account (${email}) has been successfully deleted.`
                    );
                  },
                },
              ]
            ),
        },
      ]
    );
  };

  const deleteAccount = async (currentUser) => {
    if (!currentUser) return;

    const uid = currentUser.uid;
    const usersRef = firebase.firestore().collection("users");
    const workoutsRef = firebase.firestore().collection("Workouts");
    const exercisesRef = firebase.firestore().collection("Exercises");

    // Delete exercises created by the user
    try {
      const exercisesSnapshot = await exercisesRef
        .where("userId", "==", uid)
        .get();

      const batch = firebase.firestore().batch();

      exercisesSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.log("Error deleting user's exercises:", error);
    }

    // Delete workouts created by the user
    try {
      const workoutsSnapshot = await workoutsRef
        .where("userId", "==", uid)
        .get();

      const batch = firebase.firestore().batch();

      workoutsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.log("Error deleting user's workouts:", error);
    }

    // Delete user document from the users collection
    try {
      const userSnapshot = await usersRef.where("id", "==", uid).limit(1).get();

      userSnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    } catch (error) {
      console.log("Error deleting user document:", error);
    }

    // Delete user from authentication
    try {
      await currentUser.delete();
    } catch (error) {
      console.log("Error deleting user from authentication:", error);
    }

    navigation.navigate("Login");
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

  const saveChanges = async () => {
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
    <ScrollView style={styles(isDarkMode).scrollcontainer}>
      <SafeAreaView style={styles(isDarkMode).container}>
        <ModalMenu />
        {darkModeButton}
        <Text style={styles(isDarkMode).title}>Hello, {fullName}!</Text>
        <Text style={styles(isDarkMode).field}>Full Name:</Text>
        <TextInput
          style={styles(isDarkMode, activeInput).input("fullName")}
          value={fullName}
          onChangeText={setFullName}
          onFocus={() => setActiveInput("fullName")}
          onBlur={() => setActiveInput(null)}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).field}>Email:</Text>
        <TextInput
          style={styles(isDarkMode, activeInput).input("Email")}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setActiveInput("Email")}
          onBlur={() => setActiveInput(null)}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).field}>Age:</Text>
        <TextInput
          style={styles(isDarkMode, activeInput).input("Age")}
          value={age}
          onChangeText={setAge}
          onFocus={() => setActiveInput("Age")}
          onBlur={() => setActiveInput(null)}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).field}>Location:</Text>
        <TextInput
          style={styles(isDarkMode, activeInput).input("Location")}
          value={location}
          onChangeText={setLocation}
          onFocus={() => setActiveInput("Location")}
          onBlur={() => setActiveInput(null)}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).field}>Sex:</Text>
        <TextInput
          style={styles(isDarkMode, activeInput).input("Sex")}
          value={sex}
          onChangeText={setSex}
          onFocus={() => setActiveInput("Sex")}
          onBlur={() => setActiveInput(null)}
          clearButtonMode="always"
        />

        <TouchableOpacity
          style={styles(isDarkMode).saveChangesButton}
          onPress={saveChanges}
        >
          <Text style={styles(isDarkMode).saveChangesText}>Save</Text>
          <MaterialIcons
            name="check"
            size={16}
            color={isDarkMode ? "#1463F3" : "#1463F3"}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}
