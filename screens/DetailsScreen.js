import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';

// Import constants.js, secrets.js and database.js.
import * as constant from '../controllers/constants.js'

import firebase from '../database/firebase.js';
import * as secret from '../controllers/secrets.js'
class DetailsScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      Date: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const dbRef = firebase.firestore().collection(secret.databaseTable).doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const meeting = res.data();
        this.setState({
          key: res.id,
          name: meeting.name,
          date: meeting.date,
          isLoading: false
        });
      } else {
        console.log('Document does not exist.');
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateMeeting() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection(secret.databaseTable).doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      date: this.state.date,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        date: '',
      });
      this.props.navigation.navigate(constant.toIndexScreen);
    })
    .catch((error) => {
      console.error('Error: ', error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteMeeting() {
    const dbRef = firebase.firestore().collection(secret.databaseTable).doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database.')
          this.props.navigation.navigate(constant.toIndexScreen);
      })
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      'Delete Meeting',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteMeeting()},
        {text: 'No', onPress: () => console.log('No item removed.'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style = {styles.preloader}>
          <ActivityIndicator size = 'large' color = {constant.activityIndicatorColor}/>
        </View>
      )
    }
    return (
      <ScrollView style = {styles.container}>
        <View style = {styles.inputGroup}>
          <TextInput
              placeholder = {'Name'}
              value = {this.state.name}
              onChangeText = {(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style = {styles.inputGroup}>
          <TextInput
              placeholder = {'Date'}
              value = {this.state.date}
              onChangeText = {(val) => this.inputValueUpdate(val, 'date')}
          />
        </View>
        <View style = {styles.button}>
          <Button
            title = 'Update'
            onPress = {() => this.updateMeeting()} 
            color = {constant.buttonColor}
          />
          </View>
         <View>
          <Button
            title = 'Delete'
            onPress = {this.openTwoButtonAlert}
            color = {constant.buttonDeleteColor}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7
  }
})

export default DetailsScreen;