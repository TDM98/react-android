import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import SingleSelect from '../dropdown/Single';
import MultipleSelect from '../dropdown/Multiple';



const SettingScreen = () => {
  
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>    
        <Text style={styles.title}>Language: </Text>
        <Text style={styles.title}>Dark mode: </Text>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 50,
    marginHorizontal: 10,
  },
});