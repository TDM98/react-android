import { addDays, format } from "date-fns"
import React, { useEffect, useState, useContext, useLayoutEffect } from "react"
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, LIST } from "react-native"
import { Agenda } from "react-native-calendars"
import { AuthContext } from "../context/AuthContext"
import { FloatingAction } from "react-native-floating-action"
import { primary } from "./color"
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; import { Button } from "react-native-elements"
import moment from 'moment';
import Checkbox from "expo-checkbox";
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import { MaterialDialog } from 'react-native-material-dialog';
// type Item = {
//   name: string;
//   cookies: boolean;
// };
const image = { uri: "https://i.ibb.co/Nr55GKV/8865539.png" };
const actions = [
  {
    text: "Thêm mới",
    icon: require('../assets/add.png'),
    name: 'add_meeting',
    position: 1,
    color: '#e28743',
  },
  {
    icon: require('../assets/react.png'),
    name: 'test',
    position: 2,
    color: '#014F5C',
  },
];

const actionsLeft = [
  {
    text: "Ngày",
    icon: require('../assets/3-days.png'),
    name: '1day',
    position: 1,
    color: '#1e81b0',
  },
  {
    text: "3 ngày",
    icon: require('../assets/3-days.png'),
    name: '3days',
    position: 2,
    color: '#1e81b0',
  },
  {
    text: "7 ngày",
    icon: require('../assets/7-days.png'),
    name: '7days',
    position: 3,
    color: '#884EA0',
  },
  {
    text: "Tháng",
    icon: require('../assets/30-days.png'),
    name: '30days',
    position: 4,
    color: '#F08080',
  },
];


const CalendarScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={showPicker}>
            <Ionicons name='calendar-outline' size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => { }}>
            <Ionicons name='search-outline' size={26} />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])
  const [items, setItems] = useState({})
  const { user, logout, loading } = useContext(AuthContext)
  useEffect(() => {
    // run once

    const getData = async () => {
      const response = await fetch(
        "http://172.25.200.194:8088/api/sm-details",
        {
          headers: {
            Authorization: `Bearer ${user.id_token}`
          }
        }
      )
      const data = await response.json()

      const mappedData = data.map((post, index) => {
        const date = addDays(new Date(), index)

        return {
          ...post,
          date: format(date, "yyyy-MM-dd")
        }
      })

      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...coolItem } = currentItem

        acc[date] = [coolItem]

        return acc
      }, {})

      setItems(reduced)
    }

    getData()
  }, [])

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => {
          navigation.navigate('EditMeeting', { post: item });
        }}>
        <View style={styles.itemContainer}>
          <Spinner visible={loading} />
          <Ionicons name="radio-button-on-outline" size={20} style={styles.iconTitle} color="#Ee161b" >
            <Text style={styles.itemtitle} > {item.title}</Text>
          </Ionicons>
          <Text></Text>
          <View style={styles.seDate}>
            <Ionicons name="time-outline" size={20} style={styles.icon} color="#4169E1" >
              <Text style={styles.itemtext1}>  {moment(item.startDate).format("hh:mm: a")} - </Text>
              <Text style={styles.itemtext1}>{moment(item.endDate).format("h:mm a")}</Text>
            </Ionicons>
          </View>
          <Ionicons name="location-outline" size={20} style={styles.icon1} color="#8E44AD" >
            <Text style={styles.itemtext1}>  Phòng họp IT</Text>
          </Ionicons>
        </View>
      </TouchableOpacity>
    )
  }

  const [isChecked, setChecked] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState();
  const showPicker = () => {
    setIsPickerShow(true);
    console.log("a")
  };
  const data1 = [
    { key: '0', valuee: 'Họp' },
    { key: '1', valuee: 'Hội thảo' },
    { key: '2', valuee: 'Giảng dạy' },
    { key: '3', valuee: 'Khác' }
  ];
  const [singlePickerSelectedItem, setSingleSelectedItem] = useState();
  const [visible, setVisible] = useState(true)
  return (
    <SafeAreaView style={styles.safe}>
      {isPickerShow && (

        <SinglePickerMaterialDialog
          title="Use Google's Location Service?"
          items={data1.map((key, valuee) => ({ value: valuee, label: key }))}
          visible={isPickerShow}
          onOk={() => setIsPickerShow(false)}
          onCancel={() => setIsPickerShow(false)}>
          <Text style={styles.dialogText}>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </Text>
        </SinglePickerMaterialDialog>

      )}
      <Agenda items={items} renderItem={renderItem} locale='vi' />
      <FloatingAction
        color={primary}
        actions={actions}
        onPressItem={name => {
          if (name === 'add_meeting') {
            navigation.navigate('AddMeeting')
          } else if (name === 'test') {
          }
        }
        }
      />
      <FloatingAction
        color='white'
        position="left"
        floatingIcon={<Ionicons name='calendar-outline' size={26} color='black' />}
        actions={actionsLeft}
        onPressItem={name => {
          if (name === '3days') {

          } else if (name === '7days') {
            navigation.navigate('WeekCalendar')
          } else if (name === "30days") {
            navigation.navigate('MonthCalendar')
          } else if (name === "1day") {
            navigation.navigate('DayCalendar')
          }

        }
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",
    flex: 1
  },
  itemtitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
    color: '#Ee9e16'
  },
  itemtext: {
    margin: 15,
    fontWeight: '600'
  },
  itemtext1: {
    margin: 15,
  },
  icon: {
    marginBottom: 10,
    marginLeft: 10,
  },
  icon1: {
    marginBottom: 10,
    marginLeft: 10,
    opacity: 0.7
  },
  iconTitle: {
    marginTop: 10,
    marginLeft: 10
  },
  headerBtn: {
    margin: 10
  },
  header: {
    flexDirection: 'row'
  },
  seDate: {
    flexDirection: 'row',
    opacity: 0.7
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  //checkbox
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
  checkboxContainer: {

    backgroundColor: '#FCF5E5',
    justifyContent: 'flex-end'
  },
  dialog: {

  }
})

export default CalendarScreen
