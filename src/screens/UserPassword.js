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
const UserPassword = ({ navigation, route }) => {
  const [users, setUsers] = useState({});
  const { user, logout, loading } = useContext(AuthContext);
  const [email, setEmail] = useState({});
  const [firstName, setFirstname] = useState({});
  const [lastName, setLastname] = useState({});
  const [fullName, setFullname] = useState({});
  const [login, setLogin] = useState({});
  const [password, setPassword] = useState({});
  const [hidePass, setHidePass] = useState(true);
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
        {/* <Input
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
        /> */}
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
        <Input
          placeholder=''
          label='Tên đăng nhập'
          editable={false}
          value={users.login}
          maxLength={20}

          onChangeText={val => {
            setLogin(val);
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
          label='Mật khẩu'
          value={users.password}
          secureTextEntry={hidePass ? true : false}
          maxLength={20}
          onChangeText={val => {
            setPassword(val);
          }}
          leftIcon={
            <Icon
              name='lock'
              size={22}
              color='black'
              marginRight={22}
            />
          }
          rightIcon={
            <Pressable onPress={() => setHidePass(!hidePass)}>
              <MaterialCommunityIcons name={hidePass ? 'eye-off' : 'eye'} size={22} color="#232323" />
            </Pressable>
          }
        />
        <TouchableOpacity onPress={decryptPassword}>
          <Text>decryptPassword</Text>
        </TouchableOpacity>
        <View style={styles.pwTestContainer}>
          <Text style={styles.pwTest}>Mật khẩu mới phải thỏa mãn các điều kiện sau:</Text>
          <Text style={styles.pwTest}> - Dài tối thiểu 8 ký tự</Text>
          <Text style={styles.pwTest}> - Bao gồm ít nhất 3 trong 4 nhóm ký tự sau:</Text>
          <Text style={styles.pwTest}>  + Chữ cái VIẾT HOA (Từ a đến Z)</Text>
          <Text style={styles.pwTest}>  + Chữ cái viết thường (từ a đến z)</Text>
          <Text style={styles.pwTest}>  + chữ số (từ 0 đến 9)</Text>
          <Text style={styles.pwTest}>  + Ký tự đặc biệt (ví dụ., !, $, #, %)</Text>
          <Text style={styles.pwTest}> -Mật khẩu mới đặt không được trùng với mật khẩu cũ</Text>
        </View>
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
            onPress={() => {
          
            }}>
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
  }
});

export default UserPassword;