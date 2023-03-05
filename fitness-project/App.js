import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import StackNavigator from './StackNavigator';
import { FitnessContext } from './Context';

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <FitnessContext>
      <StackNavigator/>
    </FitnessContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
