import React, { useState, useContext, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal
  , Switch
} from 'react-native'
import { firebase } from '../../firebase/config'

import { DarkModeContext } from '../../DarkModeContext'
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'

const styles = (isDarkMode, activeInput) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white'
    },
    field: {
      paddingTop: 30,
      marginVertical: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black'
    },
    inputField: (inputName) => ({
      height: 40,
      borderColor: activeInput === inputName ? '#1463F3' : 'gray',
      borderWidth: 1,
      padding: 10,
      marginVertical: 5,
      width: '72%',
      borderRadius: 5,
      backgroundColor: isDarkMode ? '#3b3b3b' : 'white',
      color: isDarkMode ? 'white' : 'black'
    }),
    updateWorkoutButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    exerciseItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15
    },
    exerciseName: {
      fontSize: 16,
      marginRight: 10,
      color: isDarkMode ? 'white' : 'black',
      paddingLeft: 5
    },
    confirmDeleteWorkoutText: {
      color: isDarkMode ? '#a90505' : '#a90505',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    navmodalbutton: {
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white',
      paddingVertical: 5,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? 'white' : 'black'
    },
    navmodalbuttonText: {
      color: isDarkMode ? 'white' : 'black',
      fontSize: 18,
      fontWeight: 'bold'
    },
    navmodalOverlay: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    navmodalView: {
      marginTop: 60,
      marginRight: 20,
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  })

const EditWorkout = ({ route, navigation }) => {
  const { workoutId } = route.params
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState({})
  const { isDarkMode } = useContext(DarkModeContext)
  const [navmodalVisible, setnavModalVisible] = useState(false)
  const [activeInput, setActiveInput] = useState(null)

  const navigateToDashboard = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('Dashboard')
  }

  const navigateToWorkoutHistory = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('WorkoutHistory')
  }

  const navigateToExercises = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('Exercises')
  }

  const navigateToViewExercises = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('ViewExercises')
  }

  const navigateToCreateWorkout = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('CreateWorkout')
  }

  const navigateToWorkoutList = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('WorkoutList')
  }

  const navigateToCalorieTracker = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('CalorieTracker')
  }

  const navigateToWeightTracker = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('WeightTracker')
  }

  const ModalMenu = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={navmodalVisible}
        onRequestClose={() => {
          setnavModalVisible(!navmodalVisible)
        }}
      >
        <TouchableOpacity
          style={styles(isDarkMode).navmodalOverlay}
          onPress={() => setnavModalVisible(!navmodalVisible)}
        >
          <View style={styles(isDarkMode).navmodalView}>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToDashboard}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                  name="dashboard"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Dashboard
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToViewExercises}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                  name="view-agenda"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  View Exercises
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToWorkoutList}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                  name="view-headline"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Manage Workouts
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToWorkoutHistory}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                  name="history"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Workout History
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToExercises}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                  name="edit"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Add Exercises
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToCreateWorkout}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                  name="rate-review"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Create Workout
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToCalorieTracker}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                  name="emoji-food-beverage"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Calorie Tracker
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToWeightTracker}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome5
                  name="weight"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Weight Tracker
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(isDarkMode).button}
              onPress={confirmDeleteWorkout}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                  name="delete"
                  size={18}
                  color={isDarkMode ? '#a90505' : '#a90505'}
                />
                <Text style={styles(isDarkMode).confirmDeleteWorkoutText}>
                  Delete Workout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setnavModalVisible(true)} style={{}}>
          <MaterialIcons
            name="more-vert"
            size={32}
            color={isDarkMode ? '#1463F3' : '#1463F3'}
          />
        </TouchableOpacity>
      )
    })
  }, [navigation, isDarkMode, setnavModalVisible])

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const workoutDoc = await firebase
          .firestore()
          .collection('Workouts')
          .doc(workoutId)
          .get()

        const workoutData = workoutDoc.data()
        setWorkoutName(workoutData.name)
        setSelectedExercises(
          workoutData.exercises.reduce(
            (acc, exerciseId) => ({ ...acc, [exerciseId]: true }),
            {}
          )
        )
      } catch (error) {
        console.log('Error fetching workout data:', error)
      }
    }

    const userId = firebase.auth().currentUser.uid

    const unsubscribeExercises = firebase
      .firestore()
      .collection('Exercises')
      .where('userId', '==', userId)
      .onSnapshot((querySnapshot) => {
        const exercisesData = []
        querySnapshot.forEach((doc) => {
          const exercise = doc.data()
          exercise.id = doc.id
          exercisesData.push(exercise)
        })
        setExercises(exercisesData)
      })

    fetchWorkout()

    return () => {
      unsubscribeExercises()
    }
  }, [workoutId])

  const toggleExerciseSelection = (exerciseId) => {
    setSelectedExercises((prevState) => ({
      ...prevState,
      [exerciseId]: !prevState[exerciseId]
    }))
  }

  const updateWorkout = async () => {
    if (!workoutName.trim()) {
      alert('Please enter a workout name')
      return
    }
    const selectedExerciseIds = Object.keys(selectedExercises).filter(
      (id) => selectedExercises[id]
    )

    if (selectedExerciseIds.length === 0) {
      alert('Please select at least one exercise')
      return
    }

    const workoutData = {
      name: workoutName,
      exercises: selectedExerciseIds
    }

    try {
      await firebase
        .firestore()
        .collection('Workouts')
        .doc(workoutId)
        .update(workoutData)
      alert('Workout updated successfully!')
    } catch (error) {
      console.log('Error updating workout:', error)
    }
  }

  const confirmDeleteWorkout = () => {
    Alert.alert(
      'Delete Workout',
      `Are you sure you want to delete this workout "${workoutName}"?`,
      [
        {
          text: 'Yes',
          style: 'destructive',
          onPress: deleteWorkout
        },
        {
          text: 'No',
          onPress: () => {
            alert(`Workout "${workoutName}" was not deleted`)
          }
        }
      ],
      { cancelable: false }
    )
  }

  const deleteWorkout = async () => {
    try {
      await firebase.firestore().collection('Workouts').doc(workoutId).delete()
      alert(`Workout "${workoutName}" was deleted successfully!`)
      navigation.goBack()
    } catch (error) {
      console.log('Error deleting workout:', error)
    }
  }

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ModalMenu />
      <Text style={styles(isDarkMode).field}>Workout Name:</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField('workoutName')}
        value={workoutName}
        onChangeText={setWorkoutName}
        onFocus={() => setActiveInput('workoutName')}
        onBlur={() => setActiveInput(null)}
      />
      <Text style={styles(isDarkMode).field}>Exercises:</Text>
      <ScrollView>
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles(isDarkMode).exerciseItem}>
            <Switch
              value={selectedExercises[exercise.id] || false}
              onValueChange={() => toggleExerciseSelection(exercise.id)}
              trackColor={{ false: 'gray', true: '#1463F3' }}
            />
            <Text style={styles(isDarkMode).exerciseName}>{exercise.name}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles(isDarkMode).updateWorkoutButton}
        onPress={updateWorkout}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={{ ...styles(isDarkMode).buttonText, color: '#1463F3' }}>
            Update Workout
          </Text>
          <MaterialIcons
            name="check"
            size={24}
            color="#1463F3"
            style={{ marginLeft: 5 }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default EditWorkout
