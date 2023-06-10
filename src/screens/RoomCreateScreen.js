import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { max } from 'react-native-reanimated';
import OutlineInput from 'react-native-outline-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingLabelInput } from 'react-native-floating-label-input';
const PostCreateScreen = ({ navigation }) => {
  const [locationName, setname] = useState(null);
  const [locationDescription, setDescription] = useState(null);
  const [notes, setNotes] = useState(null);
  const [floorNumber, setfloor] = useState(null);
  const [maxOccupancy, setoccupancy] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const createPost = () => {
    setLoading(true);

    axios
      .post(
        `${BASE_URL}/posts`,
        {
          locationName,
          locationDescription,
          notes,
          floorNumber,
          maxOccupancy

        },
        { headers: { Authorization: `Bearer ${user.id_token}` } },
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
      <OutlineInput
        style={styles.input}
        value={locationName}
        onChangeText={val => {
          setname(val);
        }}
        label="Tên phòng"
        activeValueColor="#6c63fe"
        activeBorderColor="#6c63fe"
        activeLabelColor="#6c63fe"
        passiveBorderColor="#bbb7ff"
        passiveLabelColor="#bbb7ff"
        passiveValueColor="#bbb7ff"
      />
      <OutlineInput
        value={locationDescription}
        onChangeText={val => {
          setDescription(val);
        }}
        label="Mô tả"
        activeValueColor="#6c63fe"
        activeBorderColor="#6c63fe"
        activeLabelColor="#6c63fe"
        passiveBorderColor="#bbb7ff"
        passiveLabelColor="#bbb7ff"
        passiveValueColor="#bbb7ff"
      />
      <OutlineInput
        value={notes}
        onChangeText={val => {
          setNotes(val);
        }}
        label="Ghi chú"
        activeValueColor="#6c63fe"
        activeBorderColor="#6c63fe"
        activeLabelColor="#6c63fe"
        passiveBorderColor="#bbb7ff"
        passiveLabelColor="#bbb7ff"
        passiveValueColor="#bbb7ff"
      />
      <OutlineInput
        value={floorNumber}
        onChangeText={val => {
          setfloor(val);
        }}
        label="Tầng"
        activeValueColor="#6c63fe"
        activeBorderColor="#6c63fe"
        activeLabelColor="#6c63fe"
        passiveBorderColor="#bbb7ff"
        passiveLabelColor="#bbb7ff"
        passiveValueColor="#bbb7ff"
      />
      <OutlineInput
        style={styles.input}
        value={maxOccupancy}
        onChangeText={val => {
          setoccupancy(val);
        }}
        label="Sức chứa (Số người)"
        activeValueColor="#6c63fe"
        activeBorderColor="#6c63fe"
        activeLabelColor="#6c63fe"
        passiveBorderColor="#bbb7ff"
        passiveLabelColor="#bbb7ff"
        passiveValueColor="#bbb7ff"
      />
      <Button title="Cập nhật" color={primary} onPress={createPost} />
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
    marginBottom:50
  },
  text1: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 15
  },
});

export default PostCreateScreen;
