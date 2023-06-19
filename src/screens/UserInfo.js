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
  ScrollView,
  Pressable,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react/cjs/react.development';
import { BASE_URL } from '../config';
import { primary, borderColor } from '../screens/color';
import { AuthContext } from '../context/AuthContext';
import { Input } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const UserInfo = ({ navigation, route }) => {
  const [users, setUsers] = useState({});
  const { user, logout, loading } = useContext(AuthContext);
  const [email, setEmail] = useState({});
  const [firstName, setFirstname] = useState({});
  const [lastName, setLastname] = useState({});
  const [fullName, setFullname] = useState({});
  const [login, setLogin] = useState({});
  const [password, setPassword] = useState({});
  const [hidePass,setHidePass] = useState(true);
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
          <View style={styles.direct}>
            <Text style={styles.label} >Họ</Text>
            <Input
              value={users.firstName}
              maxLength={20}
              onChangeText={val => {
                setFirstname(val);
              }}
              rightIcon={
                <Icon
                  name='pencil'
                  size={20}
                  marginRight={20}
                />
              }
            />
          </View>
          <View style={styles.direct}>
            <Text style={styles.label} >Tên</Text>
            <Input
              value={users.lastName}
              maxLength={20}
              onChangeText={val => {
                setLastname(val);
              }}
              rightIcon={
                <Icon
                  name='pencil'
                  size={20}
                  marginRight={20}
                />
              }
            />
          </View>
          <View style={styles.direct}>
            <Text style={styles.label} >Họ tên</Text>
            <Input
              value={users.fullName}
              maxLength={20}
              editable={false}
              onChangeText={val => {
                setFullname(val);
              }}

            />
          </View>
          <View style={styles.direct}>
            <Text style={styles.label} >Email</Text>
            <Input
              value={users.email}
              maxLength={20}
              onChangeText={val => {
                setEmail(val);
              }}
              rightIcon={
                <Icon
                  name='pencil'
                  size={20}
                  marginRight={40}
                />
              }

            />
          </View>
          <View style={styles.direct}>
            <Text style={styles.label} >Tài khoản</Text>
            <Input
              editable={false}
              value={users.login}
              maxLength={20}
              onChangeText={val => {
                setUsers(val);
              }}
            />
          </View>
          <View style={styles.direct}>
            <Text style={styles.label} >Mật khẩu</Text>
            <Input
              value={users.password}
              maxLength={200}
              secureTextEntry={hidePass ? true : false}
              onChangeText={val => {
                setPassword(val);
              }}
              rightIcon={
                <Pressable onPress={() => setHidePass(!hidePass)}>
              <MaterialCommunityIcons name={hidePass ? 'eye-off' : 'eye'} size={20} />
              </Pressable>
              }
            />
          </View>
          <View style={styles.btnView}>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed
                    ? 0.2
                    : 1,
                },
                styles.btnSummit,
              ]}
              onPress={() => {
                Alert.alert(
                  'Cập nhật',
                  'Lưu thông tin cập nhật',
                  [
                    {
                      text: 'Hủy',
                      onPress: () => {
                        return null;
                      }
                    },
                    {
                      text: 'Xác nhận',
                      onPress: () => {
                        handleSubmit({ firstName, lastName, fullName, email, password });
                      },
                    },
                  ],
                  { cancelable: false }
                )
              }}>
              <Icon name='edit' size={20} color='white'>
                <Text style={styles.buttonText}>  Cập nhật</Text>
              </Icon>
            </Pressable>
          </View>

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
    marginHorizontal:20
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 18,
    marginRight: 20
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 50
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
  direct: {
    flexDirection: 'row'
  },
  btnSummit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1F51FF'
  },
  btnDel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#EE4B2B',
    marginLeft: 10,
  },
  btnView: {
    flexDirection: 'row',
    margin: 10
  },
});

export default UserInfo;