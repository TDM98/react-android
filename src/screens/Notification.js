import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, SafeAreaView, Spinner, Image } from 'react-native';
import { AuthContext, useContext } from '../context/AuthContext';
const NotificationScreen = ({navigation,route}) => {
  const [loading, setLoading] = useState(false);




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <Image
          source={require('../assets/no-notification.png')}
          style={styles.logo}
          resizeMode="contain"
        >
        </Image>
          <Text style={styles.title}>Không có thông báo</Text>
          <Text style={styles.title}>Kiểm tra lại sau để xem mọi thông báo mới</Text>
        </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title:{
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18,
    marginTop: 0,
  }
}); 