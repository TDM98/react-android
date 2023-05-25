import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
const SingleSelect = () => {

    const [selected, setSelected] = React.useState([]);

    const data = [
        { key: '1', value: '101', disabled: true },
        { key: '2', value: '102' },
        { key: '3', value: '103' },
        { key: '4', value: '107', disabled: true },
        { key: '5', value: '201' },
        { key: '6', value: '202' },
        { key: '7', value: '302' },
    ]

    return (

        <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            label="Room"
        />
    );
};
export default SingleSelect;