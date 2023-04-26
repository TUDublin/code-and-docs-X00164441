import React, { useEffect, useContext, useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  Dimensions
} from 'react-native'
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native'
import { DarkModeContext } from '../../DarkModeContext'
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white',
      width: '100%'
    },
    workoutItem: {
      backgroundColor: isDarkMode ? '#3b3b3b' : '#e6e6e6',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: Dimensions.get('window').width - 40
    },
    workoutName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black'
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff',
      borderRadius: 10,
      padding: 20,
      width: '90%'
    },
    modalbutton: {
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white',
      paddingVertical: 5,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? 'white' : 'black'
    },
    modalbuttonText: {
      color: isDarkMode ? 'white' : 'black',
      fontSize: 18,
      fontWeight: 'bold'
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

const WorkoutList = ({ onWorkoutPress }) => {
  const [workouts, setWorkouts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [exerciseNames, setExerciseNames] = useState([])
  const navigation = useNavigation()
  const { isDarkMode } = useContext(DarkModeContext)
  const [navmodalVisible, setnavModalVisible] = useState(false)

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

  const navigateToProfilePage = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('Profile')
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
              style={styles(isDarkMode).navmodalbutton}
              onPress={navigateToProfilePage}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                  name="profile"
                  size={18}
                  color={isDarkMode ? 'white' : 'black'}
                />
                <Text style={styles(isDarkMode).navmodalbuttonText}>
                  Profile Page
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
    const currentUser = firebase.auth().currentUser
    if (!currentUser) return

    const uid = currentUser.uid
    const workoutsRef = firebase.firestore().collection('Workouts')

    const unsubscribe = workoutsRef
      .where('userId', '==', uid) // Filter workouts by current user's UID
      .onSnapshot((querySnapshot) => {
        const workoutsData = []
        querySnapshot.forEach((doc) => {
          const workout = doc.data()
          workout.id = doc.id
          workoutsData.push(workout)
        })
        setWorkouts(workoutsData)
      })

    return () => unsubscribe()
  }, [])

  const showWorkoutInfo = async (workout) => {
    setSelectedWorkout(workout)

    const fetchedExerciseNames = await Promise.all(
      workout.exercises.map(async (exerciseId) => {
        const exerciseDoc = await firebase
          .firestore()
          .collection('Exercises')
          .doc(exerciseId)
          .get()
        const exerciseData = exerciseDoc.data()
        return exerciseData
          ? exerciseData.name
          : `Missing exercise (${exerciseId})`
      })
    )

    setExerciseNames(fetchedExerciseNames)
    setModalVisible(true)
  }

  const handleWorkoutPress = (workout) => {
    Alert.alert('Options', 'View, Edit or Start Workout', [
      {
        text: 'Start',
        onPress: () =>
          navigation.navigate('InProgressWorkout', {
            workoutId: workout.id,
            workoutName: workout.name,
            exercises: workout.exercises
          })
      },
      {
        text: 'View',
        onPress: () => showWorkoutInfo(workout)
      },
      {
        text: 'Edit',
        onPress: () =>
          navigation.navigate('EditWorkout', { workoutId: workout.id })
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      }
    ])
  }

  return (
    <SafeAreaView style={styles(isDarkMode).container}>
      <ModalMenu />
      <ScrollView>
        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles(isDarkMode).workoutItem}
            onPress={() => handleWorkoutPress(workout)}
          >
            <Text style={styles(isDarkMode).workoutName}>{workout.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles(isDarkMode).modalContainer}>
          <View style={styles(isDarkMode).modalContent}>
            {selectedWorkout && (
              <>
                <Text
                  style={{
                    ...styles(isDarkMode).workoutName,
                    color: isDarkMode ? 'white' : 'black'
                  }}
                >
                  Workout: {selectedWorkout.name}
                </Text>
                <Text style={{ color: isDarkMode ? 'white' : 'black' }}>
                  Exercises:
                </Text>
                {exerciseNames.map((exerciseName, index) => (
                  <Text
                    key={index}
                    style={{ color: isDarkMode ? 'white' : 'black' }}
                  >
                    - {exerciseName}
                  </Text>
                ))}
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: isDarkMode ? 'white' : 'black' }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default WorkoutList
