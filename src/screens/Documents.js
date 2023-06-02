import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import SingleSelect from '../dropdown/Single';
import MultipleSelect from '../dropdown/Multiple';



const AppInfo = () => {
  
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>    
        <Text style={styles.title}>Add Documents</Text>
      </ScrollView>
    </View>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 50,
    marginHorizontal: 10,
  },
});