import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { max } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';

import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
const AddMeetingScreen = ({ navigation }) => {

  const [locationID, setLocationID] = useState("");
  const [createdBy, setCreateBy] = useState("");
  const [createdDate, setCreateDate] = useState("");
  const [meetingChairman, setMeetingChairman] = useState("");
  const [meetingChairmanName, setMeetingChairmanName] = useState("");
  const [participants, setParticipants] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date(Date.now()));
  const [isChecked, setChecked] = useState(false);

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
  // Event type
  const data1 = [
    { key: '1', value: 'Họp' },
    { key: '2', value: 'Hội thảo' },
    { key: '3', value: 'Giảng dạy' },
    { key: '4', value: 'Khác' }
  ];

  const [selected1, setSelected1] = React.useState([]);

  // Meeting Chairman
  const data2 = [
    { key: '1', value: "Trương Quang Duy" },
    { key: '2', value: "Lê Quốc Bảo" },
    { key: '3', value: "Nguyễn Hoàng Duy" },
    { key: '4', value: "Trần Bửu Đạt" },
    { key: '5', value: "Nguyễn Mạnh Hùng" },
  ]
  const [selected2, setSelected2] = React.useState([]);
  // Participants
  const data3 = [
    { key: '1', value: "Trương Quang Duy" },
    { key: '2', value: "Lê Quốc Bảo" },
    { key: '3', value: "Nguyễn Hoàng Duy" },
    { key: '4', value: "Trần Bửu Đạt" },
    { key: '5', value: "Nguyễn Mạnh Hùng" },
  ]
  const [selected3, setSelected3] = React.useState([]);
  //get location
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

  const createMeeting = () => {
    setLoading(true);

    axios
      .post(
        `${BASE_URL}/sm-details`,
        {
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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Spinner visible={loading} />
        <Text style={styles.text1}>location id</Text>
        <TextInput
          placeholder="location id"
          style={styles.input}
          value={locationID}
          onChangeText={val => {
            setLocationID(val);
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
        <Text style={styles.text1}>Location:</Text>
        <SelectList setSelected={setSelected} data={data} onSelect={() => alert(selected)} />
        <Text style={styles.text1}>Event type:</Text>
        <SelectList
          setSelected={(val) => setSelected1(val)}
          data={data1}
          save="value"
          label="Event Type"

        />
        <Text style={styles.text1}>Meeting Chairman:</Text>
        <SelectList
          setSelected={(val) => setSelected2(val)}
          data={data2}
          save="value"
          label="Meeting Chairman"

        />
        <Text style={styles.text1}>Participants:</Text>
        <MultipleSelectList
          setSelected={(val) => setSelected3(val)}
          data={data3}
          save="value"
          label="Participants"
        />
        <Text style={styles.text1}>Description:</Text>
        <TextInput
          placeholder='Meeting Description'
          style={styles.input}
          value={description}
          onChangeText={val => {
            setDescription(val);
          }}
        />
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#00BFFF' : undefined}
          />
          <Text style={styles.paragraph}>Important?</Text>
        </View>
        <TouchableOpacity onPress={createMeeting} style={styles.button1}>
          <Text style={styles.buttontext}>Summit</Text>
        </TouchableOpacity>
      </ScrollView>
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
    fontSize:15
  },
  datePickerStyle: {
    width: 230,
  },
  text: {
    textAlign: 'left',
    width: 230,
    fontSize: 16,
    color: "#000"
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,

  },
  button1: {
    elevation: 8,
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 20,
  },
  buttontext: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  label: {
    margin: 8,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  datePickerStyle: {
    width: 50,
    marginTop: 20,
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

  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  btnContainer: {
    padding: 30,
  },

});

export default AddMeetingScreen;
