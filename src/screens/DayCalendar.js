
import moment from "moment";
import Timetable from "react-native-calendar-timetable";
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Checkbox from 'expo-checkbox';
import NumericInput from 'react-native-numeric-input';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import 'moment/locale/vi'
export default function DayCalendar() {
    /**
     * By default Timetable renders one column.
     * This sets date for that column, by default equals to new Date().
     * Can be instance of Date or an ISO string.
     * Essentially, a shortcut for range {from: date, till: date}.
     */
    const [date] = React.useState(new Date());

    /**
     * If you would like to have multiple columns (e.g. from Monday to Sunday),
     * you can specify range of dates. Each day of said range will have its own column.
     *
     * 'from' and 'till', just like 'date', can be instances of Date or an ISO strings.
     *
     * It is safe to keep 'from' and 'till' in separate states if you need to
     * because Timetable only check if 'from' or 'till' had changed and
     * not the object that contains them.
     */
    const [from] = React.useState(moment().subtract(3, 'days').toDate());
    const [till] = React.useState(moment().add(3, 'days').toISOString());
    const range = {from, till};

    const [items] = React.useState([
        {
            title: 'Some event',
            startDate: moment().subtract(1, 'hour').toDate(),
            endDate: moment().add(1, 'hour').toDate(),
        },
    ]);

    return (
        <ScrollView>
            <Timetable
                // these two are required
                items={items}
                cardComponent={MyItemCard}

                // provide only one of these if you need to
                date={date} // optional
                range={range} // optional
            />
        </ScrollView>
    );
}