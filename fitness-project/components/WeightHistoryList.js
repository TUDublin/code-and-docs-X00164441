import React, { useContext, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import { DarkModeContext } from '../DarkModeContext'
import getWeightHistory from '../screens/UserProfile/weightTrackerUtils'

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white'
    },
    listItem: {
      backgroundColor: isDarkMode ? '#3b3b3b' : '#e6e6e6',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      justifyContent: 'center',
      width: Dimensions.get('window').width - 40
    },
    listItemText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black'
    }
  })

const WeightHistoryList = () => {
  const { isDarkMode } = useContext(DarkModeContext)
  const [weightHistory, setWeightHistory] = useState([])

  useFocusEffect(
    useCallback(() => {
      const fetchWeightHistory = async () => {
        const fetchedWeightHistory = await getWeightHistory()
        setWeightHistory(fetchedWeightHistory)
      }
      fetchWeightHistory()
    }, [])
  )

  const formatDateTime = (timestamp) => {
    const date = timestamp.toDate()
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day} ${month} ${year} at ${hours}:${minutes}`
  }

  return (
    <View style={styles(isDarkMode).container}>
      <FlatList
        data={weightHistory}
        renderItem={({ item }) => (
          <View style={styles(isDarkMode).listItem}>
            <Text style={styles(isDarkMode).listItemText}>
              {formatDateTime(item.createdAt)}: {item.weight}
              {item.unit}kg
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default WeightHistoryList
