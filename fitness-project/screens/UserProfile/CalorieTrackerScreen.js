import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { DarkModeContext } from "../../DarkModeContext";
import { firebase } from "../../firebase/config";

const styles = (isDarkMode, activeInput) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: isDarkMode ? "white" : "black",
    },
    inputField: (inputName) => ({
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
    foodItem: {
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: "100%",
      backgroundColor: isDarkMode ? "#3b3b3b" : "#e6e6e6",
    },
    foodName: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      color: isDarkMode ? "white" : "black",
    },
    foodDataText: {
      color: isDarkMode ? "white" : "black",
    },
    addButton: {
      backgroundColor: "#1463F3",
      borderRadius: 50,
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 10,
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
      width: "100%",
      maxHeight: "80%", // Limit the modal height
      marginVertical: 20, // Add a smaller margin
    },
    deleteButton: {
      backgroundColor: "red",
      borderRadius: 50,
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 10,
    },
  });
const CalorieTrackerScreen = () => {
  const [query, setQuery] = useState("");
  const [foodData, setFoodData] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);
  const [activeInput, setActiveInput] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [calorieData, setCalorieData] = useState([]);
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser ? currentUser.uid : "";

  const renderCalorieItem = ({ item }) => (
    <View style={styles(isDarkMode).foodItem}>
      <TouchableOpacity
        style={styles(isDarkMode).deleteButton}
        onPress={() => handleDeleteCalories(item.id, item.food)}
      >
        <Text style={{ color: "white", fontSize: 18 }}>-</Text>
      </TouchableOpacity>
      <Text style={styles(isDarkMode).foodName}>{item.food}</Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Calories: {item.calories.toFixed(2)} kcal
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Time added: {item.date.toLocaleTimeString()}
      </Text>
    </View>
  );

  useEffect(() => {
    if (!uid) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const calorieDataRef = firebase.firestore().collection("CalorieData");
    const unsubscribe = calorieDataRef
      .where("userId", "==", uid)
      .where("date", ">=", today)
      .where("date", "<", tomorrow)
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          item.date = item.date.toDate(); // Convert the date to a JavaScript Date object
          item.id = doc.id;
          data.push(item);
        });
        setCalorieData(data);
      });

    return () => unsubscribe();
  }, [uid]);

  const handleAddCalories = (item) => {
    const updatedCalorieData = [...calorieData, item];
    setCalorieData(updatedCalorieData);

    // Show alert and console.log message when adding a food item
    alert(`You have successfully added ${item.food}!`);
    console.log(
      `Added: ${item.food}, Calories: ${item.calories.toFixed(
        2
      )}kcal, Time: ${item.date.toLocaleTimeString()}`
    );

    const calorieDataRef = firebase.firestore().collection("CalorieData");
    calorieDataRef.add({
      userId: uid,
      food: item.food,
      calories: item.calories,
      date: new Date(),
    });
  };

  const addFoodToCalorieTracker = (food, calories) => {
    const newItem = {
      food: food,
      calories: calories !== undefined ? calories : 0,
      date: new Date(),
      userId: uid,
    };
    handleAddCalories(newItem);
  };

  const handleDeleteCalories = async (itemId, food) => {
    Alert.alert(
      // Replace confirm with Alert.alert
      "Delete Food Item",
      `Are you sure you want to delete ${food}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await firebase
                .firestore()
                .collection("CalorieData")
                .doc(itemId)
                .delete();
              alert(
                `You have successfully deleted ${food}! \nYour calories for today have been adjusted.`
              );
            } catch (error) {
              console.error("Error deleting food item: ", error);
              alert(
                "An error occurred while deleting the food item. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const fetchNutritionData = async () => {
    setFoodData([]);

    const EDAMAM_API_KEY = "8e547c0a30310ffd11699d1cb5dcc997";
    const EDAMAM_API_ID = "2822c934";

    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/parser?app_id=${EDAMAM_API_ID}&app_key=${EDAMAM_API_KEY}&ingr=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (data && data.hints && data.hints.length > 0) {
        setFoodData(data.hints.map((hint) => hint.food));
      } else {
        alert("No results found for your query. Please try again.");
      }
    } catch (error) {
      console.log("Error fetching nutrition data:", error);
      alert(
        "An error occurred while fetching nutrition data. Please try again."
      );
    }
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles(isDarkMode).foodItem}>
      <TouchableOpacity
        style={styles(isDarkMode).addButton}
        onPress={() =>
          addFoodToCalorieTracker(item.label, item.nutrients.ENERC_KCAL)
        }
      >
        <Text style={{ color: "white", fontSize: 18 }}>+</Text>
      </TouchableOpacity>
      <Text style={styles(isDarkMode).foodName}>{item.label}</Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Calories: {item.nutrients.ENERC_KCAL?.toFixed(2)} kcal
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Total Fat: {item.nutrients.FAT?.toFixed(2)} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Saturated Fat: {item.nutrients.FASAT?.toFixed(2) || 0} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Protein: {item.nutrients.PROCNT?.toFixed(2) || 0} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Sodium: {item.nutrients.NA?.toFixed(2) || 0} mg
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Potassium: {item.nutrients.K?.toFixed(2) || 0} mg
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Cholesterol: {item.nutrients.CHOLE?.toFixed(2) || 0} mg
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Total Carbohydrates: {item.nutrients.CHOCDF?.toFixed(2) || 0} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Fiber: {item.nutrients.FIBTG?.toFixed(2) || 0} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Sugar: {item.nutrients.SUGAR?.toFixed(2) || 0} g
      </Text>
    </View>
  );

  return (
    <View style={styles(isDarkMode).container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles(isDarkMode).modalContainer}>
          <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <View style={styles(isDarkMode).modalContent}>
              <Text style={styles(isDarkMode).title}>
                Calories consumed today:{" "}
                {calorieData
                  .reduce((total, item) => total + item.calories, 0)
                  .toFixed(2)}{" "}
                kcal
              </Text>
              <ScrollView>
                {calorieData.map((item, index) => (
                  <View key={index}>{renderCalorieItem({ item })}</View>
                ))}
              </ScrollView>
              <Button
                title="Close"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
      <Text style={styles(isDarkMode).title}>Nutritional Data</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField("foodInput")}
        onChangeText={setQuery}
        value={query}
        placeholder="Enter food query"
        placeholderTextColor={isDarkMode ? "grey" : "grey"}
        onFocus={() => setActiveInput("foodInput")}
        onBlur={() => setActiveInput(null)}
        clearButtonMode="always" // Add this line to show a clear button
      />
      <Button title="Search" onPress={fetchNutritionData} />
      <Button
        title="View Today's Calories"
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={foodData}
        renderItem={renderFoodItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CalorieTrackerScreen;
