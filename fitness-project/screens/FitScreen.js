import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FitnessItems } from "../Context";

const FitScreen = () => {
  const route = useRoute();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  const navigation = useNavigation();
  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);

  const [seconds, setTimeLeft] = useState(0);

  const startTime = () => {
    setTimeout(() => {
      setTimeLeft(seconds + 1);
    }, 1000);
  };
  
  useEffect(() => {
    startTime();
  });

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

      {/* If the excersise array index is larger than the length of the excersise array, navigate to the home screen */}
      {/* Handles error once reaching last excersise in the array */}
      {index + 1 >= excersise.length ? (
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{
            backgroundColor: "red",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
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
            FINISH
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate("Rest");
            setCompleted([...completed, current.name]);
            setWorkout(workout + 1);
            setMinutes(seconds / 60);
            setCalories(calories + 3.5);
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "green",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
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
            DONE
          </Text>
        </Pressable>
      )}

      {/* // Previous exercise button functionality */}
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
        }}
      >
        <Pressable
          disabled={index === 0}
          onPress={() => {
            navigation.navigate("Rest");

            setTimeout(() => {
              setIndex(index - 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "gray",
            padding: 10,
            borderRadius: 20,
            marginHorizontal: 20,
            width: 100,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            PREV
          </Text>
        </Pressable>

        {/* // Skip Button functionality */}
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              color = "white";
              navigation.navigate("Home");
            }}
            style={{
              backgroundColor: "red",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Rest");
              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
