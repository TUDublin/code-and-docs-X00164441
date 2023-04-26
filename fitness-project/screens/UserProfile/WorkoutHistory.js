import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native'
import { firebase } from '../../firebase/config'
import { DarkModeContext } from '../../DarkModeContext'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: isDarkMode ? '#333' : '#fff'
    },
    item: {
      backgroundColor: isDarkMode ? '#555' : '#1463F3',
      padding: 20,
      marginVertical: 8,
      borderRadius: 8
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000'
    },
    date: {
      color: isDarkMode ? '#ccc' : 'white'
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#333' : '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%'
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkMode ? '#fff' : '#000'
    },
    modalText: {
      fontSize: 18,
      color: isDarkMode ? '#fff' : '#000'
    },
    exerciseName: {
      fontSize: 18,
      fontStyle: 'italic',
      color: isDarkMode ? '#fff' : '#000'
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

const WorkoutHistory = () => {
  WorkoutHistory.navigationOptions = {
    headerLeft: () => null
  }

  const [completedWorkouts, setCompletedWorkouts] = useState([])
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [navmodalVisible, setnavModalVisible] = useState(false)
  const navigation = useNavigation()
  const { isDarkMode } = useContext(DarkModeContext)

  const navigateToDashboard = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('Dashboard')
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles(isDarkMode).item}
      onPress={() => {
        setSelectedWorkout(item)
        setModalVisible(true)
      }}
      onLongPress={() => {
        Alert.alert(
          'Delete Workout',
          'Do you want to delete this workout? This action is irreversible.',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Yes',
              style: 'destructive',
              onPress: () => deleteWorkout(item.id, item.workoutName)
            }
          ]
        )
      }}
    >
      <Text style={styles(isDarkMode).title}>Workout: {item.workoutName}</Text>
      <Text style={styles(isDarkMode).date}>
        Elapsed Time: {formatTime(item.elapsedTime)}
      </Text>
      {item.dateFinished && (
        <Text style={styles(isDarkMode).date}>
          Date Completed: {item.dateFinished.toDate().toLocaleDateString()}
        </Text>
      )}
    </TouchableOpacity>
  )

  const deleteWorkout = (workoutId, workoutName) => {
    firebase
      .firestore()
      .collection('CompletedWorkouts')
      .doc(workoutId)
      .delete()
      .then(() => {
        console.log('Workout successfully deleted!')
        Alert.alert(
          'Workout Deleted',
          `Your workout (${workoutName}) has been successfully deleted!`
        )
      })
      .catch((error) => {
        console.error('Error removing workout: ', error)
      })
  }

  useEffect(() => {
    const currentUser = firebase.auth().currentUser
    const subscriber = firebase
      .firestore()
      .collection('CompletedWorkouts')
      .where('userId', '==', currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const workouts = []
        querySnapshot.forEach((documentSnapshot) => {
          workouts.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id
          })
        })
        setCompletedWorkouts(workouts)
      })

    // Unsubscribe from Firestore on unmounting
    return () => subscriber()
  }, [])

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles(isDarkMode).container}>
      <ModalMenu />
      <FlatList
        data={completedWorkouts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        {selectedWorkout && (
          <View style={styles(isDarkMode).modalContainer}>
            <View style={styles(isDarkMode).modalContent}>
              <Text style={styles(isDarkMode).modalTitle}>
                {selectedWorkout.workoutName}
              </Text>
              <Text style={styles(isDarkMode).modalText}>
                Elapsed Time: {formatTime(selectedWorkout.elapsedTime)}
              </Text>
              {selectedWorkout.dateFinished && (
                <Text style={styles(isDarkMode).modalText}>
                  Date Completed:{' '}
                  {selectedWorkout.dateFinished.toDate().toLocaleDateString()}
                </Text>
              )}
              {selectedWorkout.exercises.map((exercise, index) => (
                <View key={index}>
                  <Text style={styles(isDarkMode).exerciseName}>
                    {'\n'}
                    {exercise.name}
                  </Text>
                  <Text style={styles(isDarkMode).modalText}>
                    Reps: {exercise.reps}, Sets: {exercise.sets}
                  </Text>
                </View>
              ))}
              <TouchableOpacity onPress={closeModal}>
                <Text
                  style={[styles(isDarkMode).modalText, { fontWeight: 'bold' }]}
                >
                  {'\n'}
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  )
}

export default WorkoutHistory
