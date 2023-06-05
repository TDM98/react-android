import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';

const EditMeetingScreen = ({ navigation, route }) => {
  const post = route.params.post;
  const[id,setId]=useState(post.id);
  const[locationID,setLocationID]= useState(post.locationID);
  const[createdBy,setCreateBy] = useState(post.createdBy);
  const[createdDate,setCreateDate] = useState(post.setCreateDate);
  const[meetingChairman,setMeetingChairman] = useState(post.meetingChairman);
  const[meetingChairmanName,setMeetingChairmanName]=useState(post.meetingChairmanName);
  const[participants,setParticipants] = useState(post.participants);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [startDate, setStartDate] = useState(post.startDate);
  const [endDate, setEndDate] = useState(post.endDate);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const EditMeeting = () => {
    setLoading(true);

    axios
      .put(
        `${BASE_URL}/sm-details/$(id)`,
        {id,
          locationID,
          createdBy,
          createdDate,
          meetingChairman,
          meetingChairmanName,
          participants,
          title,
          description,
          startDate,
          endDate
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      )
      .then(res => {
        let post = res.data;

        setLoading(false);
        navigation.navigate('MeetingListScreen', {
          post: post,
        });
        console.log(res.data);
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on updating post ${e.message}`);
      });
  };
  const deleteMeeting = () => {

  }
  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <TextInput
        placeholder="Location ID"
        style={styles.input}
        value={String(locationID)}
        onChangeText={val => {
          setLocationID(val);
        }}
      />
      <TextInput
        placeholder="Create By"
        style={styles.input}
        value={String(createdBy)}
        onChangeText={val => {
          setCreateBy(val);
        }}
      />
      <TextInput
        placeholder="Created Date"
        style={styles.input}
        value={createdDate}
        onChangeText={val => {
          setCreateDate(val);
        }}
      />
      <TextInput
        placeholder="Meeting Chairman"
        style={styles.input}
        value={meetingChairman}
        onChangeText={val => {
          setMeetingChairman(val);
        }}
      />
      <TextInput
        placeholder="Meeting Chairman Name"
        style={styles.input}
        value={meetingChairmanName}
        onChangeText={val => {
          setMeetingChairmanName(val);
        }}
      />
      <TextInput
        placeholder="Participants"
        style={styles.input}
        value={participants}
        onChangeText={val => {
          setParticipants(val);
        }}
      />
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={val => {
          setTitle(val);
        }}
      />
      <TextInput
        placeholder='Description'
        style={styles.input}
        value={description}
        onChangeText={val => {
          setDescription(val);
        }}
      />
      <TextInput
        placeholder='From'
        style={styles.input}
        value={startDate}
        onChangeText={val => {
          setStartDate(val);
        }}
      />
      <TextInput
        placeholder="To:"
        style={styles.input}
        value={endDate}
        onChangeText={val => {
          setEndDate(val);
        }}
      />

      <Button title="Update" color={primary} onPress={EditMeeting} />
      <View style={{ marginTop: 4 }}>
        <Button title="Delete" color="red" onPress={deleteMeeting} />
      </View>
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

export default EditMeetingScreen;
