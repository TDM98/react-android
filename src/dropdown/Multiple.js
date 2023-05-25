import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
const MultipleSelect = () => {

    const [selected, setSelected] = React.useState([]);

    const data = [
        { key: '1', value: 'Duy Quang Truong' },
        { key: '2', value: 'Nguyen Thang' },
        { key: '3', value: 'Bao Le' },
        { key: '4', value: 'Tran Buu Dat' },
        { key: '5', value: 'Tran Duc Minh' },
    ]
    return (

        <MultipleSelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            label="Participants"
        />
    );
};
export default MultipleSelect;