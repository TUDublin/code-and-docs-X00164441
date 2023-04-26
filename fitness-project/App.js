import React, { useState } from 'react'
import StackNavigator from './StackNavigator'
import CalorieContext from './CalorieContext'
import { DarkModeProvider } from './DarkModeContext'

export default function App () {
  const [calories, setCalories] = useState(0)

  return (
    <DarkModeProvider>
    <CalorieContext.Provider value={{ calories, setCalories }}>
      <StackNavigator/>
    </CalorieContext.Provider>
    </DarkModeProvider>
  )
}
