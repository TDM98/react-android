import React, { useContext, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const LoginScreen1 = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);

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
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Enter username"
          onChangeText={text => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          style={styles.btn}
          title="Login"
          onPress={() => {
            login(username, password);
          }}
        />

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
  }
});

export default LoginScreen1;