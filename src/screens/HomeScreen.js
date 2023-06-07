import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { primary, borderColor } from './color';
import Clock from 'react-live-clock';
const image = {uri: 'https://e0.pxfuel.com/wallpapers/738/89/desktop-wallpaper-simple-minimalistic-best-phone-background-no-distractions-scenery-painting-nature-simple-sunset.jpg'};
const actions = [
  {
    icon: require('../assets/add.png'),
    name: 'add_meeting',
    position: 1,
    color: '#FFC300',
  },
  {
    icon: require('../assets/add.png'),
    name: 'edit_meeting',
    position: 1,
    color: '#014F5C',
  },
];
// const [currentDate, setCurrentDate] = useState('');

// useEffect(() => {
//   var date = new Date().getDate(); //Current Date
//   var month = new Date().getMonth() + 1; //Current Month
//   var year = new Date().getFullYear(); //Current Year
//   var hours = new Date().getHours(); //Current Hours
//   var min = new Date().getMinutes(); //Current Minutes
//   var sec = new Date().getSeconds(); //Current Seconds
//   setCurrentDate(
//     date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
//   );
// }, []);
const HomeScreen = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    </ImageBackground>
    {/* <FloatingAction
        color={primary}
        actions={actions}
        onPressItem={name => {
          if (name === 'add_meeting') {
            navigation.navigate('AddMeeting')

          } else if (name === 'edit_meeting') {
            navigation.navigate('EditMeeting');

          }
        }
        }
      /> */}
           {/* <Text style={styles.textStyle}>Current Date Time</Text>
          <Text style={styles.textStyle}>{currentDate}</Text> */}
   
  </View>
  
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },  
});

export default HomeScreen;