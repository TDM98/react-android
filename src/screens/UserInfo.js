import axios from 'axios';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react/cjs/react.development';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { Input } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SettingsList from 'react-native-settings-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base64 } from 'js-base64';
const UserInfo = ({ navigation, route }) => {
  const [users, setUsers] = useState({});
  const { user, logout} = useContext(AuthContext);
  const [email, setEmail] = useState({});
  const [firstName, setFirstname] = useState({});
  const [lastName, setLastname] = useState({});
  const [fullName, setFullname] = useState({});
  const [login, setLogin] = useState({});
  const [password, setPassword] = useState({});
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
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

  const updateUserInfo = () => {
    axios
    .put(`${BASE_URL}/users`,{
        firstName,
        lastName,

    },
     {
        headers: {
            Authorization: `Bearer ${user.ud_token}`
        },
    })
    .then(res => {
       setUsers(res.data)
        setLoading(false);
        navigation.navigate('User Setting', {
        });
        console.log(`ok`)
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on updating post ${e.message}`);
      });
  };
  useEffect(() => {
    getUsers();
  }, [route.params?.userss]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header1}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => logout()}>
            <Ionicons name='call-outline' size={30} color={'white'} />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const decryptPassword = () => {
    var decode = Base64.decode(users.password);
    setPassword(decode );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.inputName}>
        <Input
          placeholder=''
          label='Họ'
          value={users.firstName}
          maxLength={20}

          onChangeText={val => {
            setFirstname(val);
          }}
          leftIcon={
            <Icon
              name='user-circle'
              size={20}
              color='black'
              marginRight={17}
            />
          }
        />

        <Input
          placeholder=''
          label='Tên'
          value={users.lastName}
          maxLength={20}

          onChangeText={val => {
            setLastname(val);
          }}
          leftIcon={
            <Icon
              name='user-circle'
              size={20}
              color='black'
              marginRight={17}
            />
          }
        />
        </View>
        <Input
          placeholder=''
          label='Họ tên'
          value={users.fullName}
          maxLength={20}

          onChangeText={val => {
            setFullname(val);
          }}
          leftIcon={
            <Icon
              name='user-circle'
              size={20}
              color='black'
              marginRight={17}
            />
          }
        />
        <Input
          placeholder=''
          label='Email'
          value={users.email}
          maxLength={20}

          onChangeText={val => {
            setEmail(val);
          }}
          leftIcon={
            <Icon
              name='user-circle'
              size={20}
              color='black'
              marginRight={17}
            />
          }
        />
        <View style={styles.btnView}>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed
                  ? 0.2
                  : 1,
              },
              styles.btnLogin,
            ]}
            onPress={updateUserInfo}>
            <Text style={styles.buttonText}>Lưu  <Icon name='save' size={22} /></Text>

          </Pressable>
        </View>

        {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link} >Register</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15
  },
  link: {
    color: 'blue',
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: "30%",
    width: 200,
    height: 200,

  },
  btn: {
    borderRadius: 10,
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#63ace5',
    marginRight: 10,
  },
  btnView: {
   
    marginVertical: '5%'
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 18,
    marginRight: 20
  },
  pwTestContainer:{

  },
  pwTest:{
    fontSize:18,
    color: '#005b96'
  },
});

export default UserInfo;