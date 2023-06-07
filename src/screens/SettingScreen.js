import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, SafeAreaView } from 'react-native';

const SettingScreen = () => {
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    setSwitchValue(value);
    //state changes according to switch
    //which will result in re-render the text
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/*Text to show the text according to switch condition*/}
        <Text>{switchValue ? 'Darkmode is ON' : 'Darkmode is OFF'}  <Switch
            onValueChange={toggleSwitch}
            value={switchValue}
          /></Text>
        {/*Switch with value set in constructor*/}
        {/*onValueChange will be triggered after switch condition changes*/}
        <View style={styles.switch}>
        
          <Text style={styles.title}>Language: </Text>
          <Text style={styles.title}>Vietnamese</Text>
          <Text style={styles.title}>English</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',


  },
  switch: {
   
  }
}); 