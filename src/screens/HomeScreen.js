import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState, useContext, useLayoutEffect, useMemo, useRef } from "react";
import dayjs from "dayjs";
import { AuthContext } from '../context/AuthContext';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import 'moment/locale/vi';

const image = { uri: 'https://i.pinimg.com/564x/b9/c9/89/b9c989c25792ab5094e27170c18eb015.jpg' };
const HomeScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(dayjs());
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { user, logout, loading } = useContext(AuthContext);

  const showPicker = () => {
    setIsPickerShow(true);
    console.log("a")
  };
  const onChangeDate = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }


  useEffect(() => {
    let timer = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const handleConfirm = (pItems) => {
    console.log('pItems =>', pItems);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header1}>
          <TouchableOpacity
            style={styles.headerBtn}
          >
            <Ionicons name='search-outline' size={38} color={'#FAF9F6'}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Notification')}>
            <Ionicons name='notifications-outline' size={38} color={'#FAF9F6'}/>
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])



  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={StyleSheet.absoluteFill}>
        <View style={styles.header}>
          <Text style={styles.date}>{moment(date).locale('vi').format("dddd, DD MMMM")}</Text>
          <Text style={styles.time}>{date.format("hh:mm")}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.group1}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => navigation.navigate('Room')}
            >
              <Image
                source={{ uri: 'https://i.ibb.co/tbLVxCb/meeting-room.png' }}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.headerText}>Phòng họp</Text>

            </TouchableOpacity>
            <View style={styles.buttonIconSeparatorStyle} />
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => navigation.navigate('Calendar')}
            >
              <Image
                source={{ uri: 'https://i.ibb.co/KXxzkF2/google-calendar.png' }}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.headerText}>Lịch họp</Text>
            </TouchableOpacity>
            <View style={styles.buttonIconSeparatorStyle} />
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => navigation.navigate('Documents')}
            >
              <Image
                source={{ uri: 'https://i.ibb.co/ZGt7DYz/google-docs.png' }}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.headerText}>Tài liệu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.group2}>

          </View>

        </View>

        {/* footer 1 */}
        <View style={styles.footer}>
          <View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Calendar');
              }}>
                <Image
                  source={{ uri: 'https://i.ibb.co/KXxzkF2/google-calendar.png' }}
                  style={styles.buttonImageIconStyleFooter}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.footerText}>Tài liệu</Text>
            </View>
          </View>

          <View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Calendar');
              }}>
                <Image
                  source={{ uri: 'https://i.ibb.co/KXxzkF2/google-calendar.png' }}
                  style={styles.buttonImageIconStyleFooter}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.footerText}>Tài liệu</Text>
            </View>
          </View>

          <View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Calendar');
              }}>
                <Image
                  source={{ uri: 'https://i.ibb.co/KXxzkF2/google-calendar.png' }}
                  style={styles.buttonImageIconStyleFooter}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.footerText}>Tài liệu</Text>
            </View>
          </View>

          <View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Calendar');
              }}>
                <Image
                  source={{ uri: 'https://i.ibb.co/KXxzkF2/google-calendar.png' }}
                  style={styles.buttonImageIconStyleFooter}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.footerText}>Tài liệu</Text>
            </View>
          </View>
        </View>
        {/* footer 2 */}
        <View style={styles.footer}>
          <View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Calendar');
              }}>
                <Image
                  source={{ uri: 'https://i.ibb.co/KXxzkF2/google-calendar.png' }}
                  style={styles.buttonImageIconStyleFooter}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.footerText}>Tài liệu</Text>
            </View>
          </View>

          <View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Calendar');
              }}>
                <Image
                  source={{ uri: 'https://i.ibb.co/KXxzkF2/google-calendar.png' }}
                  style={styles.buttonImageIconStyleFooter}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.footerText}>Tài liệu</Text>
            </View>
          </View>

          <View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Calendar');
              }}>
                <Image
                  source={{ uri: 'https://i.ibb.co/KXxzkF2/google-calendar.png' }}
                  style={styles.buttonImageIconStyleFooter}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.footerText}>Tài liệu</Text>
            </View>
          </View>

          <View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Calendar');
              }}>
                <Image
                  source={{ uri: 'https://i.ibb.co/RNt56jV/setting.png' }}
                  style={styles.buttonImageIconStyleFooter}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.footerText}>Cài đặt</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    marginTop:30
  },
  imgBG: {
    height: '0%'
  },
  date: {
    color: "#C3FFFE",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,
  },
  time: {
    fontSize: 82,
    fontWeight: "bold",
    color: "#C3FFFE",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 75,
  },
  icon: {
    backgroundColor: "#F9F6EE",
    width: 70,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerBtn: {
    backgroundColor: "transparent",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginHorizontal:15,
    borderWidth:1,
    borderColor: '#7DF9FF'
  },
  header1: {
    flexDirection: 'row'
  },
  cont: {
    width: 100,
    height: 100,
    flex: 1
  },
  body: {
    flexDirection: 'column'
  },
  group1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#00000026",
    backgroundColor: '#FAF9F6',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  group2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F08080',

    marginHorizontal: 20
  },
  headerIcon: {
    flex: 1,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0047AB'
  },
  footerText: {
    fontSize: 20,
    color: 'white',
    marginTop: '10%'
  },
  buttonIconSeparatorStyle: {
    backgroundColor: 'gray',
    width: 1,
    height: 80,
    opacity: 0.3
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
  },
  buttonImageIconStyleFooter: {
    padding: 10,
    margin: 5,
    height: 45,
    width: 45,
  },
});

export default HomeScreen;