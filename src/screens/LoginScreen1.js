import React, { useState, Component } from 'react'
import { ActivityIndicator, FlatList, Text, StyleSheet, TextInput, View, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen1 = () => {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");



    // constructor() {
    //     super();
    //     this.state = {
    //         username: '',
    //         password: '',
    //         rememberMe: 'true'
    //     }
    // }

    // const handleLogin = (navigate) => {
    //     // this.setState({
    //     //     loading: true
    //     // });

    //     const body = {
    //         username: user,
    //         password: pass,
    //         rememberMe: true
    //     }

    //     console.log(body)

    //     fetch('http://172.25.200.194:8088/api/authenticate', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         // body : 
    //         body: JSON.stringify({
    //             username: user,
    //             password: pass,
    //             rememberMe: true
    //         })
    //     }).then((response) => response.json()).then(rs => {
    //         console.log(rs.id_token)
    //         AsyncStorage.setItem('token', rs.id_token);
    //         const resetAction = NavigationActions.reset({
    //                              index: 0,
    //                              actions: [
    //                                  NavigationActions.navigate({ routeName: 'IndexScreen' })
    //                              ]
    //                          })
    //                          this.props.data.dispatch(resetAction)
    //     })
    //     // .then((response) => {
    //     //     this.setState({
    //     //         loading: false
    //     //     }, () => {
    //     //         if (response.token != undefined) {
    //     //             console.log(response);
    //     //             AsyncStorage.setItem('tokenUser', response.token);
    //     //             AsyncStorage.setItem('statusUser', response.status);
    //     //             AsyncStorage.setItem('idUser', response.id);
    //     //             AsyncStorage.setItem('Username', response.username);
    //     //             const resetAction = NavigationActions.reset({
    //     //                 index: 0,
    //     //                 actions: [
    //     //                     NavigationActions.navigate({ routeName: 'IndexScreen' })
    //     //                 ]
    //     //             })
    //     //             this.props.data.dispatch(resetAction)
    //     //         } else {

    //     //             this.setState({ spinner: false });
    //     //             setTimeout(() => {
    //     //                 Alert.alert('Warning', 'Username / Password');
    //     //             }, 100);

    //     //         }
    //     //     }
    //     //     );
    //     // }).done();
    // }

     const getLocation = () => {
         const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFuZ3RkIiwiYXV0aCI6IkFwcDFfQWRtaW5fR1IsVlBOLElUX0dSLFJPTEVfTkVXUyIsImV4cCI6MTY4NzY4MDMxOX0.BJFoKxm3STVQ8xV5tBvmpFzHXClIZsvKoDOq1wlpIKSYhQCbCKY8zQ5LCZWb7SuVwV2n-QGb4N2eR_RKsUYMPw'
         fetch('http://172.25.200.194:8088/api/locations', {
            method: 'GET',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
             },
         }).then((response) => response.json()).then(rs => {
             console.log(rs)
         })
     }
    const handleLogin = () => {
        fetch('http://172.25.200.194:8088/api/authenticate', {
             method: 'POST',
      headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
         },
             body: JSON.stringify({
                 username: user,
                 password: pass,
                 rememberMe: true
             })
        })
            .then((response) => response.json())
            .then((json) => {
                // You can navigate here as well
                navigation.navigate('SomeScreen');
                return json.movies;
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            >
            </Image>
            <Text>Login</Text>
            {/* {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>} */}
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                // onChangeText={username => this.setState({ username })}
                onChangeText={username => setUser(username)}
                value={user}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                // onChangeText={password => this.setState({ password })}
                onChangeText={pass => setPass(pass)}
                value={pass}
            />
            <Button style={styles.buttonLogin} title="Login" onPress={() => getLocation()} />
        </View>
    )
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
export default LoginScreen1;