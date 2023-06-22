import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, SafeAreaView, Spinner, Image } from 'react-native';
import { AuthContext, useContext } from '../context/AuthContext';

const AppInfo = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('../assets/document.png')}
          style={styles.logo}
        >
        </Image>
        <Text style={styles.title}>Đang phát triển</Text>
      </View>
    </SafeAreaView>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 20,
    marginTop: 0,
    opacity: 0.5
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
    opacity: 0.5
  }
}); 