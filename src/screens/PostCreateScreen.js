import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {BASE_URL} from '../config';
import {primary, borderColor} from '../screens/color';
import {AuthContext} from '../context/AuthContext';
import { max } from 'react-native-reanimated';

const PostCreateScreen = ({navigation}) => {
  const [locationName, setname] = useState(null);
  const [floorNumber, setfloor] = useState(null);
  const [maxOccupancy, setoccupancy] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useContext(AuthContext);

  const createPost = () => {
    setLoading(true);

    axios
      .post(
        `${BASE_URL}/posts`,
        {
          locationName,
          floorNumber,
          maxOccupancy

        },
        {headers: {Authorization: `Bearer ${user.id_token}`}},
      )
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Home', {
          post: post,
        });
        console.log(res.data);
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on creating post ${e.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput
        placeholder="Room Name"
        style={styles.input}
        value={locationName}
        onChangeText={val => {
          setname(val);
        }}
      />
      <TextInput
        placeholder="Floor"
        style={styles.input}
        value={floorNumber}
        onChangeText={val => {
          setfloor(val);
        }}
      />
      <TextInput
      placeholder='Max Occupancy'
      style={styles.input}
      value={maxOccupancy}
      onChangeText={val => {
        setoccupancy(val);
      }}
      />
      <Button title="Submit" color={primary} onPress={createPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
});

export default PostCreateScreen;
