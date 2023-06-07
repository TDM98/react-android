import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
const EditMeetingScreen = ({ navigation, route }) => {
  const post = route.params.post;
  const [id, setId] = useState(post.id);
  const [locationID, setLocationID] = useState(post.locationID);
  const [createdBy, setCreateBy] = useState(post.createdBy);
  const [createdDate, setCreateDate] = useState(post.setCreateDate);
  const [meetingChairman, setMeetingChairman] = useState(post.meetingChairman);
  const [meetingChairmanName, setMeetingChairmanName] = useState(post.meetingChairmanName);
  const [participants, setParticipants] = useState(post.participants);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [startDate, setStartDate] = useState(post.startDate);
  const [endDate, setEndDate] = useState(post.endDate);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  //get locationr
  useEffect(() => {
    async function fetchData() {
      //Get Values from database
      axios.get(`${BASE_URL}/locations`, {
        headers: { Authorization: `Bearer ${user.id_token}` },
      })
        .then((response) => {
          // Store Values in Temporary Array
          let newArray = response.data.map((item) => {
            return { key: item.id, value: item.locationName }
          })
          //Set Data Variable
          setData(newArray)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    fetchData();
  }, [])

  // edit meeting
  const EditMeeting = () => {
    setLoading(true);
    axios
      .put(
        `${BASE_URL}/sm-details/${id}`,
        {
          id,
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

  //delete meeting
  const deleteMeeting = () => {
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Spinner visible={loading} />
        <Text style={styles.text1}>Location:</Text>
        <SelectList setSelected={setSelected} data={data} onSelect={() => alert(selected)} />
        <Text style={styles.text1}>Created By:</Text>
        <TextInput
          placeholder="Create By"
          style={styles.input}
          value={String(createdBy)}
          onChangeText={val => {
            setCreateBy(val);
          }}
        />
        <Text style={styles.text1}>Create Date:</Text>
        <TextInput
          placeholder="Created Date"
          style={styles.input}
          value={createdDate}
          onChangeText={val => {
            setCreateDate(val);
          }}
        />
        <Text style={styles.text1}>Meeting Chairman:</Text>
        <TextInput
          placeholder="Meeting Chairman"
          style={styles.input}
          value={meetingChairman}
          onChangeText={val => {
            setMeetingChairman(val);
          }}
        />
        <Text style={styles.text1}>Meeting Chairman Name:</Text>
        <TextInput
          placeholder="Meeting Chairman Name"
          style={styles.input}
          value={meetingChairmanName}
          onChangeText={val => {
            setMeetingChairmanName(val);
          }}
        />
        <Text style={styles.text1}>Participants:</Text>
        <TextInput
          placeholder="Participants"
          style={styles.input}
          value={participants}
          onChangeText={val => {
            setParticipants(val);
          }}
        />
        <Text style={styles.text1}>Title:</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={val => {
            setTitle(val);
          }}
        />
        <Text style={styles.text1}>Description:</Text>
        <TextInput
          placeholder='Description'
          style={styles.input}
          value={description}
          onChangeText={val => {
            setDescription(val);
          }}
        />
        <Text style={styles.text1}>From:</Text>
        <TextInput
          placeholder='From'
          style={styles.input}
          value={startDate}
          onChangeText={val => {
            setStartDate(val);
          }}
        />
        <Text style={styles.text1}>To:</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 50
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
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,
  }
});

export default EditMeetingScreen;