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
  Icon,
  TouchableHighlight,
} from 'react-native';

import { FloatingAction } from 'react-native-floating-action';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react/cjs/react.development';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext'


 
const actions = [
  {
    icon: require('../assets/add.png'),
    name: 'add_meeting',
    position: 1,
    color: '#FFC300',
  },
  {
    icon: require('../assets/add.png'),
    name: 'edit_meeting',
    position: 1,
    color: '#014F5C',
  },
];

const MeetingListScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState({});
  const { user, logout, loading } = useContext(AuthContext);

  const getPosts = () => {
    axios
      .get(`${BASE_URL}/sm-details`, {
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
                navigation.navigate('EditMeeting', { post: item });
              }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
              <Text style={styles.info}>Des: {item.description}</Text>
              <Text style={styles.info}>From: {item.startDate}</Text>
              <Text style={styles.info}>To: {item.endDate}</Text>
            </TouchableOpacity>
            
          );
        }}
        keyExtractor={item => item.id}
      />
      {/* <FloatingAction
        color={primary}
        actions={actions}
        onPressItem={name => {
          if (name === 'add_meeting') {
            navigation.navigate('AddMeeting')

          } else if (name === 'edit_meeting') {
            navigation.navigate('EditMeeting');
          }
        }
        }
      /> */}
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
  },
});

export default MeetingListScreen;