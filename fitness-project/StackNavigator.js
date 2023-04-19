import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegistrationScreen } from './screens'
import HomeScreen from './screens/HomeScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import FitScreen from './screens/FitScreen'
import RestScreen from './screens/RestScreen'
import UserScreen from './screens/UserProfile/UserScreen'
import UserExercises from './screens/UserProfile/UserExercises'
import CreateWorkout from './screens/UserProfile/CreateWorkout'
import EditWorkout from './screens/UserProfile/EditWorkout'
import WorkoutList from "./screens/UserProfile/WorkoutList";
import ViewExercises from './screens/UserProfile/ViewExercises'
import CalorieTrackerScreen from './screens/UserProfile/CalorieTrackerScreen'
import WeightTracker from './screens/UserProfile/WeightTracker'
import Dashboard from './screens/UserProfile/Dashboard'
import { DarkModeContext } from './DarkModeContext';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const [user, setUser] = useState(null)
    const { isDarkMode } = useContext(DarkModeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white',
        },
        headerTintColor: isDarkMode ? '#1463F3' : '#1463F3',
        headerTitleStyle: {
          color: isDarkMode ? 'white' : 'black',
          fontWeight: 'bold',
        },
      }}>
      { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
          
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Sign-In"}}/>
            <Stack.Screen name="Profile" component={UserScreen} options={{ title: "Profile Page"}} />
            <Stack.Screen name="Exercises" component={UserExercises} options={{ title: "Exercises"}} />
            <Stack.Screen name="ViewExercises" component={ViewExercises} options={{ title: "View Exercises"}} />
            <Stack.Screen name="CreateWorkout" component={CreateWorkout} options={{ title: "Create Workout" }} />
            <Stack.Screen name="EditWorkout" component={EditWorkout} options={{ title: "Edit Workout" }} />
            <Stack.Screen name="WorkoutList" component={WorkoutList} options={{ title: "Workout List" }} />
            <Stack.Screen name="CalorieTracker" component={CalorieTrackerScreen} options={{ title: "Calorie Tracker" }} />
            <Stack.Screen name="WeightTracker" component={WeightTracker} options={{ title: "Weight Tracker" }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "Dashboard" }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
            <Stack.Screen name="Workout" component={WorkoutScreen} options={{headerShown:false}} />
            <Stack.Screen name="Fit" component={FitScreen} options={{headerShown:false}} />
            <Stack.Screen name="Rest" component={RestScreen} options={{headerShown:false}} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator;

const styles = StyleSheet.create({})