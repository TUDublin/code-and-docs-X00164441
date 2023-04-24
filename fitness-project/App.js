import { StyleSheet,} from 'react-native';
import React, {useState } from 'react'
import StackNavigator from './StackNavigator';
import { FitnessContext } from './Context';
import { DarkModeProvider } from './DarkModeContext';

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <DarkModeProvider>
    <FitnessContext>
      <StackNavigator/>
    </FitnessContext>
    </DarkModeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
