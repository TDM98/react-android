import React from 'react';
import { StyleSheet, View, ScrollView,Text } from 'react-native';
import SingleSelect from '../dropdown/Single';
import MultipleSelect from '../dropdown/Multiple';
const Room = () => {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        ><Text>1</Text>
          <SingleSelect />
          <MultipleSelect />
        </ScrollView>
      </View>
    );
  };
  
  export default Room;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingVertical: 50,
      marginBottom:10,
    },
  });