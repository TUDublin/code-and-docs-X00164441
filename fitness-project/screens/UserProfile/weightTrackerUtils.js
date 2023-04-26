import { firebase } from '../../firebase/config'

const getWeightHistory = async () => {
  const userId = firebase.auth().currentUser.uid

  try {
    const weightHistoryRef = firebase
      .firestore()
      .collection('Measurements')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')

    const querySnapshot = await weightHistoryRef.get()
    const weightData = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      data.id = doc.id
      return data
    })

    return weightData
  } catch (error) {
    console.error('Error fetching weight history:', error)
    return []
  }
}

export default getWeightHistory
