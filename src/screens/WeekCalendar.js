import React from 'react';
import { StyleSheet, View } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import { FloatingAction } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primary } from "./color"
export default function WeekCalendar({navigation, route}) {
    const sampleEvents = [
        { 'start': '2023-06-19 09:00:00', 'duration': '00:20:00', 'note': 'Hop it' },
        { 'start': '2023-06-21 14:00:00', 'duration': '01:00:00', 'note': 'Hop 21/6' },
        { 'start': '2023-06-20 08:00:00', 'duration': '00:30:00', 'note': 'Hop 20/6' },
        { 'start': '2023-06-20 14:00:00', 'duration': '02:00:00', 'note': 'Hop phong' },
        { 'start': '2023-06-19 19:00:00', 'duration': '01:00:00', 'note': 'test etst' },
        { 'start': '2023-06-19 09:30:00', 'duration': '01:00:00', 'note': 'abda' },
        { 'start': '2023-06-20 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
        { 'start': '2023-06-23 15:00:00', 'duration': '01:30:00', 'note': 'lich 3' },
        { 'start': '2023-06-20 18:00:00', 'duration': '02:00:00', 'note': 'Lich 4' },
        { 'start': '2023-06-12 22:00:00', 'duration': '01:00:00', 'note': 'Lich hop 5' }
    ]
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
            text: "Từng ngày",
            icon: require('../assets/1-days.png'),
            name: '1days',
            position: 1,
            color: '#DE3163',
        },
        {
            text: "3 ngày",
            icon: require('../assets/3-days.png'),
            name: '3days',
            position: 2,
            color: '#1e81b0',
        },
        {
            text: "Tháng",
            icon: require('../assets/30-days.png'),
            name: '30days',
            position: 3,
            color: '#F08080',
        },
    ];
    return (
        <View style={styles.container}>
            <WeeklyCalendar
                events={sampleEvents}
                style={{ height: '100%' }}
                selected='2023-06-19'
                startWeekday={7}
                weekdayFormat='ddd'
                locale='vi'
                themeColor='#00BBFF'
                titleStyle={{ color: '#00BBFF' }}
                dayLabelStyle={{ color: '#808080' }}
            />
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

                    } else if (name === '1days') {
                        navigation.navigate('Calendar')
                    } else if (name === "30days") {

                    }

                }
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});