import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState, useContext, useLayoutEffect, useMemo } from "react";
import dayjs from "dayjs";
import { AuthContext } from '../context/AuthContext';
import RadioGroup from 'react-native-radio-buttons-group';
const image = { uri: 'https://e0.pxfuel.com/wallpapers/738/89/desktop-wallpaper-simple-minimalistic-best-phone-background-no-distractions-scenery-painting-nature-simple-sunset.jpg' };
const HomeScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(dayjs());
  const [isPickerShow,setIsPickerShow] = useState(false);
 
  const { user, logout, loading } = useContext(AuthContext);
  useEffect(() => {
    let timer = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const radioButtons = useMemo(() => ([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Option 1',
        value: 'option1'
    },
    {
        id: '2',
        label: 'Option 2',
        value: 'option2'
    }
]), []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header1}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => { }}>
            <Ionicons name='search-outline' size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Notification')}>
            <Ionicons name='notifications-outline' size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {setIsPickerShow(true)}}>
            <Ionicons name='exit-outline' size={26} />
          </TouchableOpacity> 
          {isPickerShow && (
            <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
        />
          )}
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
          <TouchableOpacity onPress={() => {
            navigation.navigate('Room');
          }}>
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
  }
});

export default HomeScreen;