import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Alert, Pressable, TouchableOpacity, Image } from 'react-native';
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
        navigation.navigate('Calendar', {
          post: post,

        });
        console.log(`ok`);
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
      .delete(`${BASE_URL}/locations/${id}`, {
        headers: { Authorization: `Bearer ${user.id_token}` },
      })
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Calendar', { post: post });
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

        <Text style={styles.text1}>Tiêu đề:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={val => {
            setTitle(val);
          }}
        />
        <Text style={styles.text1}>Vị trí:</Text>
        <SelectList style={styles.input} setSelected={setSelected} data={data} onSelect={() => alert(selected)} />
        <Text style={styles.text1}>Người tạo:</Text>
        <TextInput
          style={styles.input}
          value={String(createdBy)}
          onChangeText={val => {
            setCreateBy(val);
          }}
          editable={false}
        />
        <Text style={styles.text1}>Ngày tạo:</Text>
        <TextInput
          style={styles.input}
          value={createdDate}
          onChangeText={val => {
            setCreateDate(val);
          }}
          editable={false}
        />
        <Text style={styles.text1}>Người chủ trì (id):</Text>
        <TextInput
          style={styles.input}
          value={meetingChairman}
          onChangeText={val => {
            setMeetingChairman(val);
          }}
        />
        <Text style={styles.text1}>Người chủ trì (tên):</Text>
        <TextInput
          style={styles.input}
          value={meetingChairmanName}
          onChangeText={val => {
            setMeetingChairmanName(val);
          }}
        />
        <Text style={styles.text1}>Người tham gia:</Text>
        <TextInput
          style={styles.input}
          value={participants}
          onChangeText={val => {
            setParticipants(val);
          }}
        />
        <Text style={styles.text1}>Mô tả:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={val => {
            setDescription(val);
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
                'Cập nhật',
                'Lưu thông tin cập nhật',
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
                      EditMeeting();
                    },
                  },
                ],
                { cancelable: false }
              )
            }}>
            <Text style={styles.buttonText}>Cập nhật</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed
                  ? 0.2
                  : 1,
              },
              styles.btnDel,
            ]}
            onPress={() => {
              Alert.alert(
                'Xóa',
                'Xác nhận xóa',
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
                      deleteMeeting();
                    },
                  },
                ],
                { cancelable: false }
              )
            }}>
            <Text style={styles.buttonText}>Xóa</Text>
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
    marginBottom: 50,
    backgroundColor: '#eee'
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
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1
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
  btnDel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#EE4B2B',
    marginTop: 20,
    marginLeft: 10,

  },
  btnView: {
    flexDirection: 'row',
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
    padding:10
  },
  buttonImageIconStyle: {
    padding: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    marginHorizontal:5,

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

export default EditMeetingScreen;