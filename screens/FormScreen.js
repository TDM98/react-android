import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';

// Import constants.js, secrets.js and database.js.
import * as constant from '../controllers/constants.js'
import * as secret from '../controllers/secrets.js'
import firebase from '../database/firebase.js';

class FormScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection(secret.databaseTable);
    this.state = {
      name: '',
      date: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeMeeting() {
    if(this.state.name === ''){
     alert('Please give it a name.')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        name: this.state.name,
        date: this.state.date,
      }).then((res) => {
        this.setState({
          name: '',
          date: '',
          isLoading: false,
        });
        this.props.navigation.navigate(constant.toIndexScreen)
      })
      .catch((err) => {
        console.error('Error: ', err);
        this.setState({
          isLoading: false,
        });
      });
    }
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
            title = 'Add Meeting'
            onPress = {() => this.storeMeeting()} 
            color = {constant.buttonColor}
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
  }
})

export default FormScreen;