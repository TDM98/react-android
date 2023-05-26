import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import SingleSelect from '../dropdown/Single';
import MultipleSelect from '../dropdown/Multiple';

import { useState } from 'react';

const Room = () => {
  const [date, setDate] = useState(new Date())
  return (
    <View style={styles.container}>

      <ScrollView

        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Select room:</Text>
        <SingleSelect />
        <Text style={styles.title}>Select participants</Text>
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
    marginHorizontal: 10,
  },
  select: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 10
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});