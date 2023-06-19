import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState, useContext, useLayoutEffect, useMemo, useRef } from "react";
import dayjs from "dayjs";
import { AuthContext } from '../context/AuthContext';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import PickerCheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';

const image = { uri: 'https://e0.pxfuel.com/wallpapers/738/89/desktop-wallpaper-simple-minimalistic-best-phone-background-no-distractions-scenery-painting-nature-simple-sunset.jpg' };
const HomeScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(dayjs());
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { user, logout, loading } = useContext(AuthContext);

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const onChangeDate = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShowStartDate(false);
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
            <Ionicons name='search-outline' size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Notification')}>
            <Ionicons name='notifications-outline' size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={showPicker}>
            <Ionicons name='exit-outline' size={26}></Ionicons>
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])



  return (
    <ImageBackground source={image} style={StyleSheet.absoluteFill}>
      <View style={styles.header}>
        <Text style={styles.date}>{date.format("dddd, DD MMMM")}</Text>
        <Text style={styles.time}>{date.format("hh:mm")}</Text>
      </View>
      {/* <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}
      {/* footer */}
      <View style={styles.footer}>

        <View style={styles.icon}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Calendar');
          }}>
            <MaterialCommunityIcons name="calendar-clock-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.icon}>
          <TouchableOpacity onPress={showPicker}>
            <Ionicons name="ios-location-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.icon}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Setting');
          }}>
            <Ionicons name="md-settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
      </View>
    </ImageBackground>
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
    marginTop: "auto",
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 75,
  },
  icon: {
    backgroundColor: "#00000050",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  headerBtn: {
    margin: 10
  },
  header1: {
    flexDirection: 'row'
  },
  cont: {
    width: 100,
    height: 100,
    flex: 1
  }
});

export default HomeScreen;