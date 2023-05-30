import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { max } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import { TouchableOpacity } from 'react-native-gesture-handler';
const AddMeetingScreen = ({ navigation }) => {
  const [title, setTitle] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vEventType, setVEventType] = useState(null)
  const [meetingChairman, setMeetingCharirman] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [isImportant, setIsImportant] = useState(null);
  const [description, setDescription] = useState(null);

  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const [selected, setSelected] = React.useState("");
  const [data, setData] = React.useState([]);


  React.useEffect(() =>
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
    , [])
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
    {key: '1', value:"Trương Quang Duy"},
    {key: '2', value:"Lê Quốc Bảo"},
    {key: '3', value:"Nguyễn Hoàng Duy"},
    {key: '4', value:"Trần Bửu Đạt"},
    {key: '5', value:"Nguyễn Mạnh Hùng"},
  ]
  const [selected2, setSelected2] = React.useState([]);
  // Participants
  const data3 = [
    {key: '1', value:"Trương Quang Duy"},
    {key: '2', value:"Lê Quốc Bảo"},
    {key: '3', value:"Nguyễn Hoàng Duy"},
    {key: '4', value:"Trần Bửu Đạt"},
    {key: '5', value:"Nguyễn Mạnh Hùng"},
  ]
  const [selected3, setSelected3] = React.useState([]);
  const createMeeting = () => {
    setLoading(true);

    axios
      .post(
        `${BASE_URL}/sm-details`,
        {
          title,
          startDate,
          endDate,
          vEventType,
          meetingChairman,
          participants,
          isImportant,
          description,

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
        <Text style={styles.text1}>Title:</Text>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={val => {
          setTitle(val);
        }}
      />
      {/* <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>Birth Date :</Text>
          <DateTimePicker
            style={styles.datePickerStyle}

            mode="date"
            placeholder="select date"
            format="DD/MM/YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2000"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: -5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderColor: "gray",
                alignItems: "flex-start",
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              placeholderText: {
                fontSize: 17,
                color: "gray"
              },
              dateText: {
                fontSize: 17,
              }
            }}
            onDateChange={(startDate) => {
              setStartDate(startDate);
            }}
          />
        </View>
      </SafeAreaView> */}
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
      <TouchableOpacity onPress={createMeeting} style={styles.button1}>
    <Text style={styles.buttontext}>Summit</Text>
  </TouchableOpacity>
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
    borderWidth: 1,
    borderColor,
    borderRadius: 5,
    paddingHorizontal: 16,
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
    fontSize:15,
    fontWeight:'bold',
    marginVertical:10,
    
  },
  button1: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical:20,
  },
  buttontext: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default AddMeetingScreen;
