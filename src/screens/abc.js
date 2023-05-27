import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image,ActivityIndicator, FlatList} from 'react-native'
import firebase from '../database/firebase'




export default class LoginScreen1 extends React.Component {
  state = { username: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { username, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => this.props.navigation.navigate('IndexScreen'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        >
        </Image>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button style={styles.buttonLogin} title="Login" onPress={this.handleLogin} />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30%",

  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: '5%',
    marginBottom: '5%',
  },
  buttonLogin: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  }
})