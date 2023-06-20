import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, SafeAreaView, Spinner, Image } from 'react-native';
import { AuthContext, useContext } from '../context/AuthContext';
const NotificationScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('../assets/zzz.png')}
          style={styles.logo}
        >
        </Image>
        <Text style={styles.title}>Không có thông báo</Text>
        <Text style={styles.title}>Kiểm tra lại sau để xem thông báo mới</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

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
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 30,
    marginBottom: 10,
    opacity: 0.5
  }
}); 