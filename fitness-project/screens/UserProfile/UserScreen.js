import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { firebase } from "../../firebase/config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  field: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5
  },
  button: {
    backgroundColor: 'blue',
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
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%'
  }
});

export default function UserScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [sex, setSex] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        const userRef = firebase.firestore()
          .collection('users')
          .where('id', '==', uid);
  
        userRef.get().then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log('No user document found for UID:', uid);
            return;
          }
  
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log(userData);
            setFullName(userData.fullName);
            setEmail(userData.email);
            setAge(userData.age);
            setLocation(userData.location);
            setSex(userData.sex);
          });
        }).catch((error) => {
          console.log('Error getting user document:', error);
        });
      } else {
        // User is not signed in
        // Redirect to login page or display an error message
      }
    });
  
    return unsubscribe;
  }, []);

  const saveChanges = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore()
        .collection('users')
        .where('id', '==', user.uid)
        .limit(1);
  
      // Validate sex field
      if (sex !== 'Male' && sex !== 'Female') {
        alert("Please enter 'Male' or 'Female' for sex field.");
        console.log('Invalid sex input:', sex);
        return;
      }
  
      // Validate birthday field
      if (age < 1 || age > 120) {
        alert("Please enter a valid age between 0 and 120.");
        console.log('Invalid birthday input:', age);
        return;
      }
  
      userRef.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('No user document found for UID:', user.uid);
          return;
        }
  
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          doc.ref.update({
            fullName: fullName || userData.fullName,
            email: email || userData.email,
            age: age || userData.age,
            location: location || userData.location,
            sex: sex || userData.sex,
          }).then(() => {
            console.log('User data updated successfully!');
          }).catch((error) => {
            console.log('Error updating user data:', error);
          });
        });
      }).catch((error) => {
        console.log('Error getting user document:', error);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.field}>Full Name:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <Text style={styles.field}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.field}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
      />
      <Text style={styles.field}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.field}>Sex:</Text>
      <TextInput
        style={styles.input}
        value={sex}
        onChangeText={setSex}
      />
      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};