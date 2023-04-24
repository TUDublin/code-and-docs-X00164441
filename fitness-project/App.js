import { StyleSheet,} from 'react-native';
import React, {useState } from 'react'
import StackNavigator from './StackNavigator';
import { FitnessContext } from './Context';
import CalorieContext from "./CalorieContext";
import { DarkModeProvider } from './DarkModeContext';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [calories, setCalories] = useState(0);

  return (
    <DarkModeProvider>
    <CalorieContext.Provider value={{ calories, setCalories }}>
    <FitnessContext>
      <StackNavigator/>
    </FitnessContext>
    </CalorieContext.Provider>
    </DarkModeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
