'use strict';
import React, { useState } from 'react';

import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Switch } from 'react-native'
const SettingScreen = ({ naviagtion, route }) => {

  const [switchValue, setSwitchValue] = useState(false);
  const onValueChange = (value) => {
    setSwitchValue(value);
  }
  const image = { uri: "https://e0.pxfuel.com/wallpapers/738/89/desktop-wallpaper-simple-minimalistic-best-phone-background-no-distractions-scenery-painting-nature-simple-sunset.jpg" };

  return (
    <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
       <ImageBackground source={image} style={styles.image}>
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
        <SettingsList.Header headerStyle={{ marginTop: 15 }} />
        <SettingsList.Item
          icon={
            <Image style={styles.imageStyle} source={require('../assets/darkmode.png')} />
          }
          hasNavArrow={false}
          switchState={switchValue}
          switchOnValueChange={switchValue => onValueChange(switchValue)}
          hasSwitch={true}
          title='Chế độ tối'
        />
        <SettingsList.Item
          icon={<Image style={styles.imageStyle} source={require('../assets/vietnam.png')} />}
          title='Ngôn ngữ'
          titleInfo='Tiếng Việt'
          titleInfoStyle={styles.titleInfoStyle}
          onPress={() => Alert.alert('')}
        />

        <SettingsList.Header headerStyle={{ marginTop: 15 }} />
        <SettingsList.Item
          icon={<Image style={styles.imageStyle} source={require('../assets/notification.png')} />}
          title='Thông báo'
          titleInfo='Bật'
          onPress={() => Alert.alert('')}
        />
        <SettingsList.Item
          icon={<Image style={styles.imageStyle} source={require('../assets/color-wheel-icon-2.jpg')} />}
          title='Chủ đề'
          titleInfo='Chủ đề 1'
          onPress={() => Alert.alert('')}
        />
        <SettingsList.Item
          icon={<Image style={styles.imageStyle} source={require('../assets/font.png')} />}
          title='Font chữ'
          titleInfo='Open Sans'
          onPress={() => Alert.alert('')}
        />
        <SettingsList.Item
          icon={<Image style={styles.imageStyle} source={require('../assets/brightness.png')} />}
          title='Độ sáng'
          onPress={() => Alert.alert('')}
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
  titleInfoStyle: {
    fontSize: 16,
    color: '#8e8e93'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default SettingScreen;