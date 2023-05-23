import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Chip } from 'react-native-elements/dist/buttons/Chip';

// Import constants.js, secrets.js and database.js.
import * as constant from '../controllers/constants.js'

import firebase from '../database/firebase.js';
import * as secret from '../controllers/secrets.js'
class IndexScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection(secret.databaseTable);
    this.state = {
      isLoading: true,
      contactArray: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  // To prevent memory leak.
  componentWillUnmount(){
    this.unsubscribe();
  }

  // Renders the data from the Firebase database and sets the loader to false when fetched.
  getCollection = (querySnapshot) => {
    const contactArray = [];
    querySnapshot.forEach((res) => {
      const { name, date } = res.data();
      contactArray.push({
        key: res.id,
        res,
        name,
        date,
      });
    });

    // Sort the output by it's name.
    contactArray.sort((a, b) => a.name > b.name);
    
    this.setState({
      contactArray,
      isLoading: false,
   });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size = 'large' color = {constant.activityIndicatorColor}/>
        </View>
      )
    }    
    return (
      <Fragment>
        <ScrollView style = {styles.container}>
            {
              this.state.contactArray.map((item, i) => {
                var initials = item.name.split(' ').map((n) => n[0]).join('');

                return (
                  <ListItem 
                  key={i} 
                  bottomDivider
                  onPress = {() => {
                        this.props.navigation.navigate(constant.toDetailsScreen, { userkey: item.key });
                      }}>
                    <Avatar
                    rounded
                    title = {initials}
                    overlayContainerStyle={{backgroundColor: constant.backgroundColor}}/>
                    <ListItem.Content>
                      <ListItem.Title>{item.name}</ListItem.Title>
                      <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                );
              })
            }
        </ScrollView>
        <View style = {styles.bottom}>
          <Chip
            // iconRight
            title = 'New Meeting'
            onPress = {() => this.props.navigation.navigate(constant.toFormScreen)} 
            // color = {constant.buttonColor}
            icon={{
              name: 'add',
              size: 20,
              color: 'white'
            }}
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 20
  },
  preloader: {
    flex: 3,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    alignSelf: 'flex-end'
  }
})

export default IndexScreen;