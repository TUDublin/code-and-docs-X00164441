import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FitScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  const navigation = useNavigation();
  console.log(current, "first excersise");
  return (
    <SafeAreaView>
      <Image
        style={{ width: "100%", height: 350 }}
        source={{ uri: current.image }}
      />

      <MaterialCommunityIcons
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 100,
          left: 20,
          color: "black",
        }}
        name="arrow-left-drop-circle-outline"
        size={28}
      />
      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {current.name}
      </Text>

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 40,
          fontWeight: "bold",
        }}
      >
        x{current.sets}
      </Text>

      <Pressable
        onPress={() => navigation.navigate("Rest")}
        style={{
          backgroundColor: "green",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
          borderRadius: 20,
          padding: 10,
          width: 150,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
          }}
        >
          Done
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
