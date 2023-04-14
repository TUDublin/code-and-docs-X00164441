import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegistrationScreen } from './screens'
import HomeScreen from './screens/HomeScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import FitScreen from './screens/FitScreen'
import RestScreen from './screens/RestScreen'
import UserScreen from './screens/UserProfile/UserScreen'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
      { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={UserScreen} options={{headerShown:false}} />
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