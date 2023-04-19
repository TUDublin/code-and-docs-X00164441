import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { DarkModeContext } from "../../DarkModeContext";

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
  });
const CalorieTrackerScreen = () => {
  const [query, setQuery] = useState("");
  const [foodData, setFoodData] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);

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
      <Text style={styles(isDarkMode).title}>Nutritional Data</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField("foodInput")}
        onChangeText={setQuery}
        value={query}
        placeholder="Enter food query"
        placeholderTextColor={isDarkMode ? "white" : "black"}
        onFocus={() => setActiveInput("foodInput")}
        onBlur={() => setActiveInput(null)}
      />
      <Button title="Search" onPress={fetchNutritionData} />
      <FlatList
        data={foodData}
        renderItem={renderFoodItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CalorieTrackerScreen;
