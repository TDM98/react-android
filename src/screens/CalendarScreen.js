import { addDays, format } from "date-fns"
import React, { useEffect, useState, useContext } from "react"
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Agenda } from "react-native-calendars"
import { AuthContext } from "../context/AuthContext"
import { FloatingAction } from "react-native-floating-action"
import { primary } from "./color"
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

// type Item = {
//   name: string;
//   cookies: boolean;
// };

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
    position: 1,
    color: '#014F5C',
  },
];

const CalendarScreen = ({ navigation, route }) => {
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
          <Text style={styles.itemtext}>Người tham gia: {item.participants}</Text>
          <Ionicons name="location-outline" size={15} style={styles.icon} color="#4169E1" >
            <Text style={styles.itemtext1}>  {item.locationID}</Text>
          </Ionicons>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Agenda items={items} renderItem={renderItem} />
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
    fontWeight: '100',
  },
  icon: {
    marginBottom: 10,
    marginLeft: 10,
  },
  iconTitle:{
    marginTop: 10,
    marginLeft:10
  }
})

export default CalendarScreen
