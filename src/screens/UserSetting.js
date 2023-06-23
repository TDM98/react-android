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
    Alert,
    ImageBackground
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
import SettingsList from 'react-native-settings-list';

const UserSetting = ({ navigation, route }) => {
    const image = { uri: "https://i.pinimg.com/564x/b9/c9/89/b9c989c25792ab5094e27170c18eb015.jpg" };
    const [users, setUsers] = useState({});
    const { user, logout, loading } = useContext(AuthContext);
    const [email, setEmail] = useState({});
    const [firstName, setFirstname] = useState({});
    const [lastName, setLastname] = useState({});
    const [fullName, setFullname] = useState({});
    const [login, setLogin] = useState({});
    const [password, setPassword] = useState({});
    const [hidePass, setHidePass] = useState(true);
    const [switchValue, setSwitchValue] = useState(false);
    const onValueChange = (value) => {
        setSwitchValue(value);
    }
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
                        // onPress={() => logout()}
                        >
                        <Ionicons name='logo-whatsapp' size={50} color='white' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity style={styles.changeAvatarButton} onPress={() => {/* open image picker */ }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' }} />

                        <View
                            style={styles.cameraIcon}>
                            <Icon
                                name="camera"
                                size={20} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.buttonTextName}>TRAN DUC MINH</Text>
                    <View style={styles.btnView}>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                },
                                styles.btnLogout,
                            ]}
                            onPress={() => {
                                Alert.alert(
                                    'Đăng xuất',
                                    'Đăng xuất?',
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
                                                logout();
                                            },
                                        },
                                    ],
                                    { cancelable: false }
                                )
                            }}>

                            <Text style={styles.buttonTextLogout}><Ionicons name='log-out-outline' size={20} /> Đăng xuất</Text>
                        </Pressable>

                    </View>
                </View>
                <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>

                    {/* {this.state.toggleAuthView ?
                   <SettingsList.Item
                    //  icon={
                    //      <Image style={styles.imageStyle} source={require('./images/user.png')}/>
                    //  }
                    //  title='Logged In As...'
                     hasNavArrow={false}
                   />
                   :
                   <SettingsList.Item
                    //  icon={
                    //      <Image style={styles.imageStyle} source={require('./images/user.png')}/>
                    //  }
                     isAuth={true}
                     authPropsUser={{placeholder:'E-mail'}}
                     authPropsPW={{placeholder:'Password'}}
                     onPress={() => this.toggleAuthView()}
                   />
                 } */}
                    <SettingsList.Header headerText='Bảo mật' headerStyle={{ marginTop: 15, fontSize: 22, color: 'white' }} />
                    <SettingsList.Item
                        icon={<Image style={styles.imageStyle} source={{ uri: 'https://i.ibb.co/vqVDZZf/padlock.png' }} />}
                        title='Đổi mật khẩu'

                        titleInfoStyle={styles.titleInfoStyle}
                        onPress={() => navigation.navigate('User Info')}
                    />
                    <SettingsList.Item
                        icon={
                            <Image style={styles.imageStyle} source={{uri:'https://i.ibb.co/VCMh6WQ/fingerprint.png'}} />
                        }
                        hasNavArrow={false}
                        switchState={switchValue}
                        switchOnValueChange={switchValue => onValueChange(switchValue)}
                        hasSwitch={true}
                        title='Đăng nhập bằng vân tay'
                    />
                      <SettingsList.Item
                        icon={
                            <Image style={styles.imageStyle} source={{uri:'https://i.ibb.co/xhzK46h/internet.png'}} />
                        }
                        hasNavArrow={false}
                        title='Quản lý đăng nhập Web'
                    />

                    <SettingsList.Header headerText='Trợ giúp' headerStyle={{ marginTop: 15, fontSize: 22, color: 'white' }} />
                    <SettingsList.Item
                        icon={
                            <Image style={styles.imageStyle} source={{uri:'https://i.ibb.co/xhzK46h/internet.png'}} />
                        }
                        hasNavArrow={false}
                        title='Test'
                    />
                      <SettingsList.Item
                        icon={
                            <Image style={styles.imageStyle} source={{uri:'https://i.ibb.co/xhzK46h/internet.png'}} />
                        }
                        hasNavArrow={false}
                        title='Test'
                    />
                      <SettingsList.Item
                        icon={
                            <Image style={styles.imageStyle} source={{uri:'https://i.ibb.co/xhzK46h/internet.png'}} />
                        }
                        hasNavArrow={false}
                        title='Test'
                    />
                </SettingsList>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        marginLeft: 15,
        alignSelf: 'center',
        height: 30,
        width: 30
    },
    imageHeaderStyle: {
     
        alignSelf: 'center',
        height: 30,
        width: 30
    },
    titleInfoStyle: {
        fontSize: 16,
        color: '#8e8e93'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    changeAvatarButton: {
        marginTop: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#00FFFF'
    },
    buttonTextLogout: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#00008B',
    },
    btnView: {
        flexDirection: 'row-reverse',
        margin: 10
    },
    btnLogout: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#c9e8f5',
        opacity: 0.9
    },
    buttonTextName: {
        marginVertical: 20,
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    cameraIcon:{
        justifyContent: 'center',
        alignItems: 'center',
        top: '65%',
        right: 0,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: "#FFFFFF",
        width: 30,
        aspectRatio: 1,
        borderRadius: 30,
    },
    headerBtn:{
        backgroundColor: "transparent",
        width: 50,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    opacity:0.8,
        borderColor: '#7DF9FF'
    }
});

export default UserSetting;