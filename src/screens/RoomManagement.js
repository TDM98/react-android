import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Fab,
  Icon
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react/cjs/react.development';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
const actions = [
  {
    text: 'Tạo mới',
    icon: require('../assets/add.png'),
    name: 'add_room',
    position: 1,
    color: '#e28743',
  },
  {
    icon: require('../assets/logout.png'),
    name: 'add_meeting',
    position: 1,
    color: '#014F5C',
  }
];

const RoomScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState({});
  const { user, logout, loading } = useContext(AuthContext);

  const getPosts = () => {
    axios
      .get(`${BASE_URL}/locations?page=0&size=30`, {
        headers: { Authorization: `Bearer ${user.id_token}` },
      })
      .then(res => {

        setPosts(res.data);
      })
      .catch(e => {
        console.log(`Error on getting posts ${e.message}`);
      });
  };

  useEffect(() => {
    getPosts();
  }, [route.params?.post]);

  
  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemWrapper}
              onPress={() => {
                navigation.navigate('Edit', { post: item });
              }}>
              <Text style={styles.title}>{item.locationName}</Text>
              <Text>{item.body}</Text>
              <View style={styles.rowInfo}>
              <Ionicons name="business-outline" size={17} color="#4169E1" />
              <Text style={styles.info}>   {item.floorNumber}</Text>
              </View>
              <View style={styles.rowInfo}>
              <Ionicons name="people-outline" size={17} color="#4169E1" />
              <Text style={styles.info}>   {item.maxOccupancy} người</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
      <FloatingAction
        color={primary}
        actions={actions}
        onPressItem={name => {
          if (name === 'add_meeting') {
          } else if (name === 'add_room') {
            navigation.navigate('Create');
          }
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor,
    backgroundColor:'#f0e9da',
    margin: 10,
    borderRadius:20,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rowInfo:{
    flexDirection:'row',
    margin:5,
  },
  info: {
    fontWeight: '600',
    fontSize:16,
  },
});

export default RoomScreen;