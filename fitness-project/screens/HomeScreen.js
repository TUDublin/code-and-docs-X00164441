import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, } from "react";
import { useNavigation } from "@react-navigation/native";
import FitnessCards from "../components/FitnessCards";
import { FitnessItems } from "../Context";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { minutes, calories, workout } = useContext(FitnessItems);

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View
        style={{
          backgroundColor: "#7a81fa",
          padding: 10,
          height: 200,
          width: "100%",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Home Workout
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {workout}
            </Text>
            <Text style={{ color: "black", fontSize: 17, marginTop: 6 }}>
              WORKOUTS
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {calories}
            </Text>
            <Text style={{ color: "black", fontSize: 17, marginTop: 6 }}>
              Calories
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {minutes}
            </Text>
            <Text style={{ color: "black", fontSize: 17, marginTop: 6 }}>
              Minutes
            </Text>
          </View>
        </View>

        <View>
          <Pressable
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Image
              style={{
                justifyContent: "center", 
                alignItems: "center",
                height: 120,
                marginTop: 20,
                borderRadius: 7,
              }}
              
              source={{
                uri: "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",
              }}
            />
          </Pressable>
        </View>
        
        <FitnessCards></FitnessCards>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
