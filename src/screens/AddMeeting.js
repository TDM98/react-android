import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { max } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';

import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
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
        console.log('ok');
        navigation.navigate('Calendar', {
          post: post,
        });
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on updating post ${e.message}`);
      });
  };
  const test = () => {
    console.log('test');
  }
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Spinner visible={loading} />
        <Text style={styles.text1}>Mã phòng</Text>
        <TextInput
          keyboardType = 'numeric'
          style={styles.input}
          value={locationID}
          onChangeText={val => {
            setLocationID(val);
          }}
        />
        <Text style={styles.text1}>Tiêu đề:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={val => {
            setTitle(val);
          }}
        />
        {/* Start */}
        <Text style={styles.text1}>Bắt đầu:</Text>
        <TouchableOpacity
          style={styles.buttonFacebookStyle}
          activeOpacity={0.5} onPress={showPicker}>
          <Text style={styles.pickedDate}>{startDate.toUTCString()}</Text>
          <View style={styles.buttonIconSeparatorStyle} />
          <Image
            source={require('../assets/calendar.png')}
            style={styles.buttonImageIconStyle}
          />
        </TouchableOpacity>
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

        {/* End */}
        <Text style={styles.text1}>Kết thúc:</Text>
        <TouchableOpacity
          style={styles.buttonFacebookStyle}
          activeOpacity={0.5} onPress={showPickerEnd}>
          <Text style={styles.pickedDate}>{endDate.toUTCString()}</Text>
          <View style={styles.buttonIconSeparatorStyle} />

          <Image
            source={require('../assets/calendar.png')}
            style={styles.buttonImageIconStyle}
          />
        </TouchableOpacity>
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
        <Text style={styles.text1}>Phòng:</Text>
        <SelectList setSelected={setSelected} data={data} onSelect={() => alert(selected)} />
        <Text style={styles.text1}>Phân loại:</Text>
        <SelectList
          setSelected={(val) => setSelected1(val)}
          data={data1}
          save="value"
          label="Event Type"

        />
        <Text style={styles.text1}>Người chủ trì:</Text>
        <SelectList
          setSelected={(val) => setSelected2(val)}
          data={data2}
          save="value"
          label="Meeting Chairman"

        />
        <Text style={styles.text1}>Người tham gia:</Text>
        <MultipleSelectList
          setSelected={(val) => setSelected3(val)}
          data={data3}
          save="value"
          label="Participants"
        />
        <Text style={styles.text1}>Mô tả:</Text>
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
          <Text style={styles.paragraph}>Quan trọng?</Text>
        </View>
        <View style={styles.btnView}>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed
                  ? 0.2
                  : 1,
              },
              styles.btnEdit,
            ]}
            onPress={() => {
              Alert.alert(
                'Thêm mới',
                'Thêm mới lịch',
                [
                  {
                    text: 'Hủy',
                    onPress: () => {
                      return null;
                    }
                  },
                  {
                    text: 'Xác nhận',
                    onPress: () => {
                      createMeeting();
                    },
                  },
                ],
                { cancelable: false }
              )
            }}>
            <Text style={styles.buttonText}>Thêm mới</Text>
          </Pressable>
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
    backgroundColor: '#eee',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15
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
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1
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
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  btnEdit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1F51FF',
    marginTop: 20,
  },
  btnView: {
    justifyContent: 'center',
    justifyItem: 'center',
    margin: 10
  },
  buttonGPlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5eeda',
    borderWidth: 0.5,
    borderColor: '#f5eeda',
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  buttonFacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eab676',
    borderWidth: 0.5,
    borderColor: '#f5eeda',
    height: 40,
    borderRadius: 10,
    margin: 5,
    padding: 10
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    marginHorizontal:5
  },
  buttonTextStyle: {
    color: '#f5eeda',
    marginBottom: 4,
    marginLeft: 10,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#f5eeda',
    width: 1,
    height: 40,
  },
});

export default AddMeetingScreen;
