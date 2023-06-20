import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Checkbox from 'expo-checkbox';
import NumericInput from 'react-native-numeric-input';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from 'moment';
import 'moment/locale/vi'
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
  const [vEventType, SetVEvenType] = useState("")
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date(Date.now()));
  const [isChecked, setChecked] = useState(false);

  const [isPickerShowStartDate, setIsPickerShowStartDate] = useState(false);
  const [isPickerShowStartTime, setIsPickerShowStartTime] = useState(false);

  const [isPickerShowEndDate, setIsPickerShowEndDate] = useState(false);
  const [isPickerShowEndTime, setIsPickerShowEndTime] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const showPickerStartDate = () => {
    setIsPickerShowStartDate(true);
  };
  const showPickerStartTime = () => {
    setIsPickerShowStartTime(true);
  };

  const showPickerEndDate = () => {
    setIsPickerShowEndDate(true);
  };
  const showPickerEndTime = () => {
    setIsPickerShowEndTime(true);
  }

  const onChangeStartDate = (event, value) => {
    setStartDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShowStartDate(false);
    }
  };

  const onChangeStartTime = (event, value) => {
    setStartDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShowStartTime(false);
    }
  };



  const onChangeEndDate = (event, value1) => {
    setEndDate(value1);
    if (Platform.OS === 'android') {
      setIsPickerShowEndDate(false);
    }
  };
  const onChangeEndTime = (event, value1) => {
    setEndDate(value1);
    if (Platform.OS === 'android') {
      setIsPickerShowEndTime(false);
    }
  };
  // Event type
  const data1 = [
    { key: '0', value: 'Họp' },
    { key: '1', value: 'Hội thảo' },
    { key: '2', value: 'Giảng dạy' },
    { key: '3', value: 'Khác' }
  ];

  const [selected1, setSelected1] = React.useState([]);

  // Meeting Chairman
  const data2 = [
    { key: '0', value: "Trương Quang Duy" },
    { key: '1', value: "Lê Quốc Bảo" },
    { key: '2', value: "Nguyễn Hoàng Duy" },
    { key: '3', value: "Trần Bửu Đạt" },
    { key: '4', value: "Nguyễn Mạnh Hùng" },
  ]
  const [selected2, setSelected2] = React.useState([]);
  // Participants
  const data3 = [
    { key: '0', value: "Trương Quang Duy" },
    { key: '1', value: "Lê Quốc Bảo" },
    { key: '2', value: "Nguyễn Hoàng Duy" },
    { key: '3', value: "Trần Bửu Đạt" },
    { key: '4', value: "Nguyễn Mạnh Hùng" },
    { ket: '5', value: "Trần Đức Minh"}
  ]
  const [selected3, setSelected3] = React.useState([]);
  //get location
  useEffect(() => {
    async function fetchData() {
      //Get Values from database
      axios.get(`${BASE_URL}/locations?sort=isDeleted&size=10`, {
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
        console.log(res.data)
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on updating post ${e.message}`);
      });
  };
  const checkInput = () => {
    if (!title.trim()) {
      Alert.alert(
        'Lỗi',
        'Nhập tên cuộc họp'
      )
      return;
    }
    createMeeting();
  }

  // const checkMeeting = () => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `${BASE_URL}/sm-details`,
  //       {
  //         headers: { Authorization: `Bearer ${user.id_token}` },
  //       },
  //     )
  //     .then(res => {
  //       let post = res.data;
  //       setLoading(false);
  //       console.log('ok');
  //       navigation.navigate('Calendar', {
  //         post: post,
  //       });
  //       console.log(res.data)
  //     })
  //     .catch(e => {
  //       setLoading(false);
  //       console.log(`Error on updating post ${e.message}`);
  //     });
  // }
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Spinner visible={loading} />
        <Text style={styles.text1}>Tiêu đề <Text style={styles.highlight}>(*)</Text></Text>
        <Input
          placeholder='Tiêu đề'
          value={title}
          maxLength={50}
          onChangeText={val => {
            setTitle(val);
          }}
          leftIcon={
            <Icon
              marginRight={20}
              name='pencil'
              size={20}
              color='#DC143C'
            />
          }
        />
        {/* Start */}
        <MaterialCommunityIcons name='calendar-start' size={20} color='#4CBB17'><Text style={styles.text1} color='#AAFF00'>  Bắt đầu <Text style={styles.highlight}>(*)</Text></Text></MaterialCommunityIcons>
        <View
          style={styles.buttonFacebookStyle}>
          <Text style={styles.pickedDate}>{moment(startDate).locale('vi').format("dddd-DD-MM-YYYY, h:mm a")}</Text>
          <View style={styles.buttonIconSeparatorStyle} />
          <TouchableOpacity
            activeOpacity={0.5} onPress={showPickerStartDate}>
            <Image
              source={require('../assets/calendar2.png')}
              style={styles.buttonImageIconStyle}
            />
          </TouchableOpacity>

          {isPickerShowStartDate && (
            <DateTimePicker
              value={startDate}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onChangeStartDate}
              style={styles.datePicker}
            />
          )}
          <TouchableOpacity
            style={styles.buttonFacebookStyle}
            activeOpacity={0.5} onPress={showPickerStartTime}>
            <View style={styles.buttonIconSeparatorStyle} />
            <Image
              source={require('../assets/alarm-clock.png')}
              style={styles.buttonImageIconStyle}
            />
          </TouchableOpacity>
          {isPickerShowStartTime && (
            <DateTimePicker
              value={startDate}
              mode={'time'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onChangeStartTime}
              style={styles.datePicker}
            />
          )}
        </View>

        {/* End */}
        <MaterialCommunityIcons name='calendar-end' size={20} color='#C70039'><Text style={styles.text1}>  Kết thúc <Text style={styles.highlight}>(*)</Text></Text></MaterialCommunityIcons>
        <View
          style={styles.buttonFacebookStyle}>
          <Text style={styles.pickedDate}>{moment(endDate).locale('vi').format("dddd-DD-MM-YYYY, h:mm a")}</Text>
          <View style={styles.buttonIconSeparatorStyle} />
          <TouchableOpacity
            activeOpacity={0.5} onPress={showPickerEndDate}>
            <Image
              source={require('../assets/calendar2.png')}
              style={styles.buttonImageIconStyle}
            />
          </TouchableOpacity>
          {isPickerShowEndDate && (
            <DateTimePicker
              value={endDate}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onChangeEndDate}
              style={styles.datePicker}
            />
          )}
          <TouchableOpacity
            style={styles.buttonFacebookStyle}
            activeOpacity={0.5} onPress={showPickerEndTime}>
            <View style={styles.buttonIconSeparatorStyle} />
            <Image
              source={require('../assets/alarm-clock.png')}
              style={styles.buttonImageIconStyle}
            />
          </TouchableOpacity>
          {isPickerShowEndTime && (
            <DateTimePicker
              value={endDate}
              mode={'time'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onChangeEndTime}
              style={styles.datePicker}
            />

          )}
        </View>

        <Ionicons name='location-outline' size={20} marginVertical={20}><Text style={styles.text1}> Vị trí</Text></Ionicons>
        <SelectList 
        setSelected={setLocationID}
        data={data} 
        placeholder='Chọn'
        searchPlaceholder=''
        notFoundText='Không tìm thấy'
        />
        <Ionicons name='pricetag-outline' size={20} marginVertical={20}><Text style={styles.text1}> Loại sự kiện</Text></Ionicons>
        <SelectList 
        setSelected={SetVEvenType} 
        data={data1} 
        placeholder='Chọn'
        searchPlaceholder=''
        notFoundText='Không tìm thấy'
        />
        <Ionicons name='person-outline' size={20} marginVertical={20}><Text style={styles.text1}> Người chủ trì</Text></Ionicons>
        <SelectList
         setSelected={setMeetingChairman} 
         data={data2} 
         placeholder='Chọn'
         searchPlaceholder=''
         notFoundText='Không tìm thấy'
        />
        <Ionicons name='people-outline' size={20} marginVertical={20}><Text style={styles.text1}> Người tham gia</Text></Ionicons>
        <MultipleSelectList
         setSelected={setParticipants} 
         data={data3} 
         placeholder='Chọn'
         searchPlaceholder=''
         notFoundText='Không tìm thấy'
        />
        <Text style={styles.text1}>Mô tả</Text>
        <Input
          placeholder='Mô tả'
          value={description}
          maxLength={50}
          onChangeText={val => {
            setDescription(val);
          }}
          leftIcon={
            <Icon
              marginRight={20}
              name='list-ul'
              size={20}
              color='#808080'
            />
          }
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
              styles.btnAdd,
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
                      checkInput();
                    },
                  },
                ],
                { cancelable: false }
              )
            }}>
            <Icon name='plus' size={18} color='white'>
              <Text style={styles.buttonText}>  Thêm mới</Text>
            </Icon>
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
    backgroundColor: 'white',
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
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 18,
    color: 'black'

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
  btnAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#1F51FF',
    marginVertical: 20
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
    backgroundColor: '#F9F6EE',
    borderWidth: 0.5,
    borderColor: '#f5eeda',
    height: 40,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    marginVertical: 20,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
  
    marginLeft: 10
  },
  buttonTextStyle: {
    color: '#f5eeda',
    marginBottom: 4,
    marginLeft: 10,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#FFC300',
    width: 1,
    height: 40,
  },
  highlight: {
    color: 'red'
  }
});

export default AddMeetingScreen;
