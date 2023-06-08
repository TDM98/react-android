import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';

import DateTimePicker from '@react-native-community/datetimepicker';
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
    setLoading(true);

    axios
      .delete(`${BASE_URL}/sm-details/${id}`, {
        headers: {Authorization: `Bearer ${user.id_token}`},
      })
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('MeetingListScreen', {post: post});
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on deleting post ${e.message}`);
      });
  };

  const [isPickerShow, setIsPickerShow] = useState(false);

  const [isPickerShowEnd, setIsPickerShowEnd] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const showPicker = () => {
    setIsPickerShow(true);
  };
  const showPickerEnd = () => {
    setIsPickerShowEnd(true);
  };

  const onChange = (event, value) => {
    setStartDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  const onChangeEnd = (event, value1) => {
    setEndDate(value1);
    if (Platform.OS === 'android') {
      setIsPickerShowEnd(false);
    }
  };
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
        {/* Display the selected date */}
        <View style={styles.pickedDateContainer}>
          <Text style={styles.pickedDate}>{startDate.toUTCString()}</Text>
        </View>

        {/* The button that used to trigger the date picker */}
        {!isPickerShow && (
          <View style={styles.btnContainer}>
            <Button title="Pick Date" color="#eb9b34" onPress={showPicker} />
          </View>
        )}

        {/* The date picker */}
        {isPickerShow && (
          <DateTimePicker
            value={startDate}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}
        <Text style={styles.text1}>To:</Text>
        {/* Display the selected date */}
        <View style={styles.pickedDateContainer}>
          <Text style={styles.pickedDate}>{endDate.toUTCString()}</Text>
        </View>

        {/* The button that used to trigger the date picker */}
        {!isPickerShowEnd && (
          <View style={styles.btnContainer}>
            <Button title="Pick Date" color="#eb9b34" onPress={showPickerEnd} />
          </View>
        )}

        {/* The date picker */}
        {isPickerShowEnd && (
          <DateTimePicker
            value={endDate}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChangeEnd}
            style={styles.datePicker}
          />
        )}
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
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    fontSize:15
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pickedDateContainer: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1
  },
  pickedDate: {
    fontSize: 15,
    color: 'black',
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

});

export default EditMeetingScreen;