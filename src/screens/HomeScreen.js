import axios from 'axios';
import React, {useContext, useEffect} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Spinner from 'react-native-loading-spinner-overlay';
import {useState} from 'react/cjs/react.development';
import {BASE_URL} from '../config';
import {primary, borderColor} from '../screens/color';
import {AuthContext} from '../context/AuthContext'

const actions = [
  {
    icon: require('../assets/logout.png'),
    name: 'logout',
    position: 2,
    color: '#FF5733',
  },
  {
    icon: require('../assets/add.png'),
    name: 'add_post',
    position: 1,
    color: '#FFC300',
  },
  {
    icon: require('../assets/add.png'),
    name: 'calendar',
    position: 1,
    color: '#C70039',
  },
  {
    icon: require('../assets/add.png'),
    name: 'addmeeting',
    position: 1,
    color: '#014F5C',
  },
];

const HomeScreen = ({navigation, route}) => {
  const [posts, setPosts] = useState({});
  const {user, logout, loading} = useContext(AuthContext);

  const getPosts = () => {
    axios
      .get(`${BASE_URL}/locations`, {
        headers: {Authorization: `Bearer ${user.id_token}`},
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
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemWrapper}
              onPress={() => {
                navigation.navigate('Edit', {post: item});
              }}>
              <Text style={styles.title}>{item.locationName}</Text>
              <Text>{item.body}</Text>
              <Text style={styles.info}>Floor: {item.floorNumber}</Text>
              <Text style={styles.info}>Max Occupancy: {item.maxOccupancy}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
      <FloatingAction
        color={primary}
        actions={actions}
        onPressItem={name => {
          if (name === 'logout') {
            logout();
          } else if (name === 'add_post') {
            navigation.navigate('Create');
          } else if (name === 'calendar'){
            navigation.navigate('Calendar');
          } else if(name === 'addmeeting') {
            navigation.navigate('AddMeeting')
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
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  info: {
    fontWeight: '600',
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default HomeScreen;