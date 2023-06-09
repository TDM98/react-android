import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
    </AuthProvider>
  );
};

export default App;

// import React,{useState} from 'react';
// import './src/assets/i18n/i18n'
// import {View, Text,Pressable} from 'react-native';
// import {useTranslation} from 'react-i18next';

// const App = () => {
	
// const {t, i18n} = useTranslation();

// const [currentLanguage,setLanguage] =useState('en');

// const changeLanguage = value => {
// 	i18n
// 	.changeLanguage(value)
// 	.then(() => setLanguage(value))
// 	.catch(err => console.log(err));
// };

// return (
// <View
// 		style={{
// 		flex: 1,
// 		backgroundColor: 'white',
// 		alignItems: 'center',
// 		justifyContent: 'space-evenly',
// 		}}>
// 		<Text style={{fontWeight: 'bold', fontSize: 25, color: '#33A850'}}>
// 		{t('hello')}{' '}
// 		</Text>
// 		<Text style={{fontWeight: 'bold', fontSize: 25, color: '#33A850'}}>
// 		{t('this line is translated')}
// 		</Text>
// 		<Pressable
// 		onPress={() => changeLanguage('en')}
// 		style={{
// 			backgroundColor:
// 			currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
// 			padding: 20,
// 		}}>
// 		<Text>Select English</Text>
// 		</Pressable>
// 		<Pressable
// 		onPress={() => changeLanguage('hi')}
// 		style={{
// 			backgroundColor:
// 			currentLanguage === 'hi' ? '#33A850' : '#d3d3d3',
// 			padding: 20,
// 		}}>
// 		<Text>हिंदी का चयन करें</Text>
// 		</Pressable>
// 	</View>
// );
// };

// export default App;
