import {addDays, format} from 'date-fns';
import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { AuthContext } from '../context/AuthContext';
// type Item = {
//   name: string;
//   cookies: boolean;
// };

type Post = {
  id: number;
  title: string;
  description: string;
  meetingChairman: string;
  participants: string;
};

const CalendarScreen: React.FC = () => {
  const [items, setItems] = useState<{[key: string]: Post[]}>({});
  const { user, logout, loading } = useContext(AuthContext);
  useEffect(() => {
    // run once

    const getData = async () => {
      const response = await fetch(
        'http://172.25.200.194:8088/api/sm-details',{
          headers: {

            Authorization: `Bearer ${user.id_token}`
          },
        }
      );
      const data: Post[] = await response.json();

      const mappedData = data.map((post, index) => {
        const date = addDays(new Date(), index);

        return {
          ...post,
          date: format(date, 'yyyy-MM-dd'),
        };
      });

      const reduced = mappedData.reduce(
        (acc: {[key: string]: Post[]}, currentItem) => {
          const {date, ...coolItem} = currentItem;

          acc[date] = [coolItem];

          return acc;
        },
        {},
      );

      setItems(reduced);
    };

    getData();
  }, []);

  const renderItem = (item: Post) => {
    return (
      <View style={styles.itemContainer}>
        <Text>Title: {item.title}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Meeting Charimain: {item.meetingChairman}</Text>
        <Text>Participants: {item.participants}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Agenda items={items} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'stretch',
    textAlign:'left',
    flex: 1,
  },
});

export default CalendarScreen;