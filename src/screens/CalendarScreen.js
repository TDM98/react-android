// import {addDays, format} from 'date-fns';
// import React, {useEffect, useState} from 'react';
// import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import {Agenda} from 'react-native-calendars';



// type Item = {
//   id: number,
//   locationID: number,
//   createdBy: number,
//   meetingChairman: string,
//   participants: string,
//   title: string,
//   description: string,
//   isImportant: boolean,
//   style: string,
//   vEventType: number,
// };

// const CalendarScreen: React.FC = () => {
//   const [items, setItems] = useState<{[key: string]: Item[]}>({});

//   useEffect(() => {
//     // run once

//     const getData = async () => {
//       const response = await fetch(
//         'http://172.25.200.194:8088/api/sm-details/get-all-events?UserID=10008&Date=2022-11-24T22:00:22',
//       );
//       const data: Item[] = await response.json();

//       const mappedData = data.map((item, index) => {
//         const date = addDays(new Date(), index);

//         return {
//           ...item,
//           date: format(date, 'yyyy-MM-dd'),
//         };
//       });

//       const reduced = mappedData.reduce(
//         (acc: {[key: string]: Item[]}, currentItem) => {
//           const {date, ...coolItem} = currentItem;

//           acc[date] = [coolItem];

//           return acc;
//         },
//         {},
//       );

//       setItems(reduced);
//     };

//     getData();
//   }, []);

//   const renderItem = (item: Item) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Text>{item.title}</Text>
//         <Text>{item.description}</Text>
//         <Text>{item.meetingChairman}</Text>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <Agenda items={items} renderItem={renderItem} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//   },
//   itemContainer: {
//     backgroundColor: 'white',
//     margin: 5,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
// });

// export default CalendarScreen;

// Example of Calendar with Events Listed in React Native
// https://aboutreact.com/example-of-calendar-with-events-listed-in-react-native/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

//import EventCalendar component
import EventCalendar from 'react-native-events-calendar';

//get the size of device
let {width} = Dimensions.get('window');

const CalendarScreen = () => {
  const [events, setEvents] = useState([
    {
      start: '2023-06-02 07:00:00',
      end: '2023-06-02 09:00:00',
      title: 'Test test',
      summary: 'test test',
    },
    {
      start: '2023-06-02 01:00:00',
      end: '2023-06-02 03:00:00',
      title: 'Test test',
      summary: 'test test',
    },
    {
      start: '2023-06-01 8:30:00',
      end: '2023-06-01 9:30:00',
      title: 'test',
      summary: 'test',
    },
    {
      start: '2023-05-31 01:30:00',
      end: '2023-05-31 02:20:00',
      title: 'test',
      summary: 'test',
    },
  
  ]);

  const eventClicked = (event) => {
    //On Click of event showing alert from here
    alert(JSON.stringify(event));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <EventCalendar
          eventTapped={eventClicked}
          // Function on event press
          events={events}
          // Passing the Array of event
          width={width}
          // Container width
          size={60}
          // number of date will render before and after initDate
          // (default is 30 will render 30 day before initDate
          // and 29 day after initDate)
          initDate={'2023-06-02'}
          // Show initial date (default is today)
          scrollToFirst
          // Scroll to first event of the day (default true)
        />
      </View>
    </SafeAreaView>
  );
};
export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});