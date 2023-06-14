import React, { useContext, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Pressable
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Input } from 'react-native-elements';
import { use } from 'i18next';

const LoginScreen1 = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, login } = useContext(AuthContext);
  const [hidePass, setHidePass] = useState(true);
  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!username.trim()) {
      alert(`Nhập tài khoản`);
      return;
    }
    else if (!password.trim()){
      alert(`Nhập mật khẩu`)
    }
    login(username,password);
  };
  return ( 
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Image
          source={require('../assets/tvmlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        >
        </Image>
        <Input
          placeholder='Tài khoản'
          value={username}
          maxLength={20}
          onChangeText={val => {
            setUsername(val);
          }}
          leftIcon={
            <Icon
              name='user-circle'
              size={20}
              color='black'
            />
          }
        />
        <Input
          placeholder='Mật khẩu'
          value={password}
          secureTextEntry={hidePass ? true : false} 
          maxLength={100}
          onChangeText={val => {
            setPassword(val);
          }}
          leftIcon={
            <Icon
              name='lock'
              size={22}
              color='black'
            />
          }
          rightIcon={
            <Pressable onPress={() => setHidePass(!hidePass)}>
            <MaterialCommunityIcons name={hidePass ? 'eye-off' : 'eye'} size={22} color="#232323" />
          </Pressable>
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
            onPress={() => {
              checkTextInput()
            }}>
            <Text style={styles.buttonText}>Đăng nhập  <Icon name='chevron-circle-right' size={22}/></Text>
           
          </Pressable>
        </View>

        {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link} >Register</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#EE4B2B',
    marginRight: 10,
  },
  btnView: {
    flexDirection: 'row-reverse',
    margin: 10
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default LoginScreen1;