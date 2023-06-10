import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';

const RoomEditScreen = ({ navigation, route }) => {
  const post = route.params.post;
  const [locationName, setname] = useState(post.locationName);
  const [locationDescription, setDescription] = useState(post.locationDescription);
  const [notes, setNotes] = useState(post.notes);
  const [floorNumber, setfloor] = useState(post.floorNumber);
  const [maxOccupancy, setoccupancy] = useState(post.maxOccupancy);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const editRoom = () => {
    // setLoading(true);
    // axios
    //   .put(
    //     `${BASE_URL}/locations/${id}`,
    //     {
    //       id,
    //       locationName,
    //       locationDescription,
    //       notes,
    //       floorNumber,
    //       maxOccupancy
    //     },
    //     {
    //       headers: { Authorization: `Bearer ${user.id_token}` },
    //     },
    //   )
    //   .then(res => {
    //     let post = res.data;
    //     setLoading(false);
    //     navigation.navigate('MeetingListScreen', {
    //       post: post,
    //     });
    //   })
    //   .catch(e => {
    //     setLoading(false);
    //     console.log(`Error on updating post ${e.message}`);
    //   });
  };


  const deleteRoom = () => {
    // setLoading(true);

    // axios
    //   .delete(`${BASE_URL}/posts/${post.id}`, {
    //     headers: { Authorization: `Bearer ${user.token}` },
    //   })
    //   .then(res => {
    //     let post = res.data;
    //     setLoading(false);
    //     navigation.navigate('Home', { post: post });
    //   })
    //   .catch(e => {
    //     setLoading(false);
    //     console.log(`Error on deleting post ${e.message}`);
    //   });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <Text style={styles.text1}>Tên phòng: </Text>
      <TextInput
        placeholder="Location Name"
        style={styles.input}
        value={locationName}
        onChangeText={val => {
          setname(val);
        }}
      />
      <Text style={styles.text1}>Mô tả: </Text>
      <TextInput
        placeholder='Description'
        style={styles.input}
        value={locationDescription}
        onChangeText={val => {
          setDescription(val);
        }}
      />
      <Text style={styles.text1}>Ghi chú: </Text>
      <TextInput
        placeholder='Note'
        style={styles.input}
        value={notes}
        onChangeText={val => {
          setNotes(val);
        }}
      />
      <Text style={styles.text1}>Tầng: </Text>
      <TextInput
        placeholder="Floor Number"
        style={styles.input}
        value={String(floorNumber)}
        onChangeText={val => {
          setfloor(val);
        }}
      />
      <Text style={styles.text1}>Sức chứa (Số người): </Text>
      <TextInput
        placeholder="Max Occupancy"
        style={styles.input}
        value={String(maxOccupancy)}
        onChangeText={val => {
          setoccupancy(val);
        }}
      />

      <Button style={styles.btn} title="Cập nhật" color={primary} onPress={() => {
        Alert.alert(
          'Update',
          'Update this room?',
          [
            {
              text: 'Cancel',
              onPress: () => {
                return null;
              },
            },
            {
              text: 'Confirm',
              onpress: () => {
                editRoom();
              },
            },
          ],
          { cancelable: false },
        )
      }} />

      <Button title="Xóa" color="red" onPress={() => {
        Alert.alert(
          'Delete',
          'Delete this room?',
          [
            {
              text: 'Cancel',
              onpress: () => {
                return null;
              },
            },
            {
              text: 'Confirm',
              onPress: () => {
                deleteRoom();
              },
            },
          ],
          { cancelable: false },
        )
      }} />

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
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
  },
  text1: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 15
  },
  btn: {

  }
});

export default RoomEditScreen;
