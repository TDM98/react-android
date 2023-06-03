import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react/cjs/react.development';
import { BASE_URL } from '../config';
import { primary, borderColor } from '../screens/color';
import { AuthContext } from '../context/AuthContext'

const UserInfo = ({ navigation, route }) => {
  const [users, setUsers] = useState({});
  const { user, logout, loading } = useContext(AuthContext);
  const [email, setEmail] = useState({});
  const [firstName, setFirstname] = useState({});
  const [lastName, setLastname] = useState({});
  const [fullName, setFullname] = useState({});
  const [login, setLogin] = useState({});
  const [password, setPassword] = useState({});
  const handleSubmit = () => {

  }
  const getUsers = () => {
    axios
      .get(`${BASE_URL}/users/get-current-user-login`, {
        headers: {

          Authorization: `Bearer ${user.id_token}`
        },
      })
      .then(res => {

        setUsers(res.data);
        // console.log(res.data)
      })
      .catch(e => {
        console.log(`Error on getting user ${e.message}`);
      });
  };

  useEffect(() => {
    getUsers();
  }, [route.params?.userss]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' }}
          />
          <TouchableOpacity style={styles.changeAvatarButton} onPress={() => {/* open image picker */ }}>
            <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Text style={styles.label} >First Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter First Name'
            value={users.firstName}
            onChangeText={setFirstname}
          />
          <Text style={styles.label} >Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter Last Name'
            value={users.lastName}
            onChangeText={setLastname}
          />
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter Full Name'
            value={users.fullName}
            onChangeText={setFullname}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={users.email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>User name</Text>
          <TextInput
            editable={false}
            style={styles.input}
            value={users.login}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={users.password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={() => handleSubmit({ firstName, lastName, fullName, email, password })}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',

  },
  form: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom:50
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
});

export default UserInfo;