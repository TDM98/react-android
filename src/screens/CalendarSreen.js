import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ActionButton, Button,Icon} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import {FloatingAction} from 'react-native-floating-action';
import {primary, borderColor} from '../screens/color';
import { Chip } from 'react-native-elements/dist/buttons/Chip';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}
const CalendarScreen = () => {
    const [items, setItems] = React.useState({});

    const loadItems = (day) => {

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(10, Math.floor(Math.random() * 150)),
                            day: strTime
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Card>
                    <Card.Content>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={'2023-05-24'}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={false}
                renderItem={renderItem}
            />
            <StatusBar />
            <View style = {styles.bottom}>
          <Chip
            // iconRight
            title = 'New Meeting'
            onPress = {() => navigation.navigate('AddMeeting')} 
            // color = {constant.buttonColor}
        
          />
        </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
      bottom: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        alignSelf: 'flex-end'
      },
});

export default CalendarScreen