import React, { useState, useContext, useEffect } from 'react'
import CalorieContext from '../../CalorieContext'
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native'
import { DarkModeContext } from '../../DarkModeContext'
import { firebase } from '../../firebase/config'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'

const styles = (isDarkMode, activeInput) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1c1c1c' : '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
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
    foodItem: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%',
      backgroundColor: isDarkMode ? '#3b3b3b' : '#e6e6e6'
    },
    foodName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: isDarkMode ? 'white' : 'black'
    },
    foodDataText: {
      color: isDarkMode ? 'white' : 'black'
    },
    addButton: {
      backgroundColor: '#1463F3',
      borderRadius: 50,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10
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
      width: '100%',
      maxHeight: '80%', // Limit the modal height
      marginVertical: 20 // Add a smaller margin
    },
    deleteButton: {
      backgroundColor: 'red',
      borderRadius: 50,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10
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
const CalorieTrackerScreen = () => {
  const { setCalories } = useContext(CalorieContext)
  const [query, setQuery] = useState('')
  const [foodData, setFoodData] = useState([])
  const { isDarkMode } = useContext(DarkModeContext)
  const [activeInput, setActiveInput] = useState(null)
  const navigation = useNavigation()
  const [navmodalVisible, setnavModalVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [calorieData, setCalorieData] = useState([])
  const currentUser = firebase.auth().currentUser
  const uid = currentUser ? currentUser.uid : ''

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

  const navigateToProfilePage = () => {
    setnavModalVisible(!navmodalVisible)
    navigation.navigate('Profile')
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

  const renderCalorieItem = ({ item }) => (
    <View style={styles(isDarkMode).foodItem}>
      <TouchableOpacity
        style={styles(isDarkMode).deleteButton}
        onPress={() => handleDeleteCalories(item.id, item.food)}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>-</Text>
      </TouchableOpacity>
      <Text style={styles(isDarkMode).foodName}>{item.food}</Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Calories: {item.calories.toFixed(2)} kcal
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Time added: {item.date.toLocaleTimeString()}
      </Text>
    </View>
  )

  useEffect(() => {
    if (!uid) {
      // Clear calorie data if no user is logged in
      setCalorieData([])
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const calorieDataRef = firebase.firestore().collection('CalorieData')
    const unsubscribe = calorieDataRef
      .where('userId', '==', uid)
      .where('date', '>=', today)
      .where('date', '<', tomorrow)
      .onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          const item = doc.data()
          item.date = item.date.toDate() // Convert the date to a JavaScript Date object
          item.id = doc.id
          data.push(item)
        })
        setCalorieData(data)
      })

    return () => unsubscribe()
  }, [uid])

  const handleAddCalories = (item) => {
    const updatedCalorieData = [...calorieData, item]
    setCalorieData(updatedCalorieData)

    // Show alert and console.log message when adding a food item
    alert(`You have successfully added ${item.food}!`)
    console.log(
      `Added: ${item.food}, Calories: ${item.calories.toFixed(
        2
      )}kcal, Time: ${item.date.toLocaleTimeString()}`
    )

    const calorieDataRef = firebase.firestore().collection('CalorieData')
    calorieDataRef.add({
      userId: uid,
      food: item.food,
      calories: item.calories,
      date: new Date()
    })
  }

  const addFoodToCalorieTracker = (food, calories) => {
    const newItem = {
      food,
      calories: calories !== undefined ? calories : 0,
      date: new Date(),
      userId: uid
    }
    handleAddCalories(newItem)
  }

  const handleDeleteCalories = async (itemId, food) => {
    Alert.alert(
      // Replace confirm with Alert.alert
      'Delete Food Item',
      `Are you sure you want to delete ${food}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await firebase
                .firestore()
                .collection('CalorieData')
                .doc(itemId)
                .delete()
              alert(
                `You have successfully deleted ${food}! \nYour calories for today have been adjusted.`
              )
            } catch (error) {
              console.error('Error deleting food item: ', error)
              alert(
                'An error occurred while deleting the food item. Please try again.'
              )
            }
          }
        }
      ],
      { cancelable: false }
    )
  }

  // Update the context when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const totalCalories = calorieData.reduce(
        (total, item) => total + item.calories,
        0
      )
      setCalories(totalCalories)
    }, [calorieData, setCalories])
  )

  const fetchNutritionData = async () => {
    setFoodData([])

    const EDAMAM_API_KEY = '8e547c0a30310ffd11699d1cb5dcc997'
    const EDAMAM_API_ID = '2822c934'

    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/parser?app_id=${EDAMAM_API_ID}&app_key=${EDAMAM_API_KEY}&ingr=${encodeURIComponent(
          query
        )}`
      )
      const data = await response.json()

      if (data && data.hints && data.hints.length > 0) {
        setFoodData(data.hints.map((hint) => hint.food))
      } else {
        alert('No results found for your query. Please try again.')
      }
    } catch (error) {
      console.log('Error fetching nutrition data:', error)
      alert(
        'An error occurred while fetching nutrition data. Please try again.'
      )
    }
  }

  const renderFoodItem = ({ item }) => (
    <View style={styles(isDarkMode).foodItem}>
      <TouchableOpacity
        style={styles(isDarkMode).addButton}
        onPress={() =>
          addFoodToCalorieTracker(item.label, item.nutrients.ENERC_KCAL)
        }
      >
        <Text style={{ color: 'white', fontSize: 18 }}>+</Text>
      </TouchableOpacity>
      <Text style={styles(isDarkMode).foodName}>{item.label}</Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Calories: {item.nutrients.ENERC_KCAL?.toFixed(2)} kcal
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Total Fat: {item.nutrients.FAT?.toFixed(2)} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Saturated Fat: {item.nutrients.FASAT?.toFixed(2) || 0} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Protein: {item.nutrients.PROCNT?.toFixed(2) || 0} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Sodium: {item.nutrients.NA?.toFixed(2) || 0} mg
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Potassium: {item.nutrients.K?.toFixed(2) || 0} mg
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Cholesterol: {item.nutrients.CHOLE?.toFixed(2) || 0} mg
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Total Carbohydrates: {item.nutrients.CHOCDF?.toFixed(2) || 0} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Fiber: {item.nutrients.FIBTG?.toFixed(2) || 0} g
      </Text>
      <Text style={styles(isDarkMode).foodDataText}>
        Sugar: {item.nutrients.SUGAR?.toFixed(2) || 0} g
      </Text>
    </View>
  )

  return (
    <View style={styles(isDarkMode).container}>
      <ModalMenu />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles(isDarkMode).modalContainer}>
          <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <View style={styles(isDarkMode).modalContent}>
              <Text style={styles(isDarkMode).title}>
                Calories consumed today:{'\n '}
                {calorieData
                  .reduce((total, item) => total + item.calories, 0)
                  .toFixed(2)}{' '}
                kcal
              </Text>
              <ScrollView>
                {calorieData.map((item, index) => (
                  <View key={index}>{renderCalorieItem({ item })}</View>
                ))}
              </ScrollView>
              <Button
                title="Close"
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
      <Text style={styles(isDarkMode).title}>Nutritional Data</Text>
      <TextInput
        style={styles(isDarkMode, activeInput).inputField('foodInput')}
        onChangeText={setQuery}
        value={query}
        placeholder="Enter food query"
        placeholderTextColor={isDarkMode ? 'grey' : 'grey'}
        onFocus={() => setActiveInput('foodInput')}
        onBlur={() => setActiveInput(null)}
        clearButtonMode="always"
      />
      <Button title="Search" onPress={fetchNutritionData} />
      <Button
        title="View Today's Calories"
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={foodData}
        renderItem={renderFoodItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default CalorieTrackerScreen
