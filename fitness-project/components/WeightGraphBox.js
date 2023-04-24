import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Circle } from "react-native-svg";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { firebase } from "../firebase/config";
import { DarkModeContext } from "../DarkModeContext";
import * as d3 from "d3-scale";
const WeightGraphBox = () => {
  const [measurements, setMeasurements] = useState([]);
  const userId = firebase.auth().currentUser.uid;
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Measurements")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const measurementsData = [];
        querySnapshot.forEach((doc) => {
          const measurement = doc.data();
          measurement.id = doc.id;
          measurementsData.push(measurement);
        });
        setMeasurements(measurementsData);
      });

    return () => unsubscribe();
  }, []);

  const last30DaysMeasurements = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today - 30 * 24 * 60 * 60 * 1000);
    return measurements.filter(
      (measurement) =>
        measurement.createdAt.toDate() >= thirtyDaysAgo &&
        measurement.createdAt.toDate() <= today
    );
  };

  const graphData = last30DaysMeasurements().map(
    (measurement) => measurement.weight
  );

  const xAxisLabels = Array.from(
    new Set(
      last30DaysMeasurements().map((measurement) =>
        measurement.createdAt
          .toDate()
          .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
      )
    )
  );
  const Decorator = ({ x, y }) => {
    return graphData.map((value, index) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke={isDarkMode ? "white" : "black"}
        fill={isDarkMode ? "white" : "black"}
        position="absolute"
      />
    ));
  };

  return (
    <View style={styles(isDarkMode).container}>
      <View style={{ flexDirection: "row", flex: 1, height: "100%" }}>
        <YAxis
          data={graphData}
          contentInset={{ top: 30, bottom: 30 }}
          svg={{ fill: isDarkMode ? "white" : "black" }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}kg`}
        />
        <LineChart
          style={{ flex: 1, height: "100%", width: "100%" }}
          data={graphData}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          yScale={d3.scaleLinear}
          yMin={Math.min(...graphData) - 5}
          yMax={Math.max(...graphData) + 5}
        >
          <Grid />
          <Decorator />
        </LineChart>
      </View>
      <XAxis
        data={graphData}
        formatLabel={(index) => xAxisLabels[index]}
        contentInset={{ left: 20, right: 20 }}
        svg={{ fill: isDarkMode ? "white" : "black" }}
      />
    </View>
  );
};

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? "#444" : "#fff",
      borderRadius: 10,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      height: 200,
      width: Dimensions.get("window").width * 0.9,
    },
  });

export default WeightGraphBox;
