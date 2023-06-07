import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';

const PostEditScreen = ({ navigation, route }) => {
  const post = route.params.post;
  const [locationName, setname] = useState(post.locationName);
  const [locationDescription, setDescription] = useState(post.locationDescription);
  const [notes, setNotes] = useState(post.notes);
  const [floorNumber, setfloor] = useState(post.floorNumber);
  const [maxOccupancy, setoccupancy] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const editPost = () => {
    setLoading(true);
    axios
      .put(
        `${BASE_URL}/locations/${id}`,
        {
          id,
          locationName,
          locationDescription,
          notes,
          floorNumber,
          maxOccupancy
        },
        {
          headers: { Authorization: `Bearer ${user.id_token}` },
        },
      )
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('MeetingListScreen', {
          post: post,
        });
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on updating post ${e.message}`);
      });
  };


  const deletePost = () => {
    setLoading(true);

    axios
      .delete(`${BASE_URL}/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Home', { post: post });
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on deleting post ${e.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <TextInput
        placeholder="Location Name"
        style={styles.input}
        value={locationName}
        onChangeText={val => {
          setname(val);
        }}
      />
      <TextInput
        placeholder='Description'
        style={styles.input}
        value={locationDescription}
        onChangeText={val => {
          setDescription(val);
        }}
      />
      <TextInput
        placeholder='Note'
        style={styles.input}
        value={notes}
        onChangeText={val => {
          setNotes(val);
        }}
      />
      <TextInput
        placeholder="Floor Number"
        style={styles.input}
        value={String(floorNumber)}
        onChangeText={val => {
          setfloor(val);
        }}
      />
      <TextInput
        placeholder="Max Occupancy"
        style={styles.input}
        value={maxOccupancy}
        onChangeText={val => {
          setoccupancy(val);
        }}
      />


      {/* <Button title="Update" color={primary} onPress={editPost} />
      <View style={{ marginTop: 4 }}>
        <Button title="Delete" color="red" onPress={deletePost} />
      </View> */}
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

export default PostEditScreen;
