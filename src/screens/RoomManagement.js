import axios from 'axios';
import React, { useContext, useEffect, useRef, useLayoutEffect } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Fab,
  Pressable,
  ImageBackground,
  Image
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react/cjs/react.development';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
const image = { uri: "https://e0.pxfuel.com/wallpapers/738/89/desktop-wallpaper-simple-minimalistic-best-phone-background-no-distractions-scenery-painting-nature-simple-sunset.jpg" };
const actions = [
  {
    text: 'Tạo mới',
    icon: require('../assets/add.png'),
    name: 'add_room',
    position: 1,
    color: '#e28743',
  },
  {
    icon: require('../assets/logout.png'),
    name: 'add_meeting',
    position: 1,
    color: '#014F5C',
  }
];

const RoomScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={closeSearch}>
            <Ionicons name='md-grid-outline' size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={showSearch}
          >
            <Ionicons name='search-outline' size={26} />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])
  const [posts, setPosts] = useState({});
  const { user, logout, loading } = useContext(AuthContext);
  const flatlistRef = useRef();
  const [shouldShow, setShouldShow] = useState(true);
  const getPosts = () => {
    axios
      .get(`${BASE_URL}/locations?sort=isDeleted&size=20`, {
        headers: { Authorization: `Bearer ${user.id_token}` },
      })
      .then(res => {

        setPosts(res.data);
      })
      .catch(e => {
        console.log(`Error on getting posts ${e.message}`);
      });
  };

  const [show, setShow] = useState(false);


  const showSearch = () => {
    setShow(true) ;
  }
  const closeSearch = () => {
    setShow(false);
  }
  

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    getPosts();
  }, [route.params?.post]);

  const onPressFunction = () => {
    flatlistRef.current?.scrollToIndex({ index: 0 });
  };
  return (

    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Spinner visible={loading} />

        {show && (
          <View>
          <View style={styles.searchBar}>
              <Searchbar
                placeholder="Tìm"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
          </View>
           <TouchableOpacity
                style={styles.headerIcon}
                onPress={closeSearch}
              >
                <Image
                  source={{ uri: 'https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png' }}
                  style={styles.buttonImageIconStyle}
                />
              </TouchableOpacity>
          </View>    
        )}


        <FlatList
          ref={flatlistRef}
          data={posts}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.itemWrapper}
                onPress={() => {
                  navigation.navigate('Edit', { post: item });
                }}>
                <Text style={styles.title}>
                  <Ionicons name='radio-button-on-outline' size={20} color='#DC143C' />   {item.locationName}</Text>
                <Text>{item.body}</Text>
                <View style={styles.rowInfo}>
                  <Ionicons name="business-outline" size={18} color="#4169E1" />
                  <Text style={styles.info}>   {item.floorNumber}</Text>
                </View>
                <View style={styles.rowInfo}>
                  <Ionicons name="people-outline" size={18} color="#4169E1" />
                  <Text style={styles.info}>   {item.maxOccupancy} người</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />

        <Pressable style={({ pressed }) => [
          {
            opacity: pressed
              ? 0.2
              : 1,
          },
          styles.button,
        ]}
          onPress={() => {
            onPressFunction()
          }}>
          <Text style={styles.arrow}>
            <MaterialCommunityIcons name="arrow-up-bold-outline" size={24} color="white" />
          </Text>
        </Pressable>

        <FloatingAction
          color={primary}
          actions={actions}
          distanceToEdge={20}
          onPress={() => setShouldShow(!shouldShow)}
          onPressItem={name => {
            if (name === 'add_meeting') {
            } else if (name === 'add_room') {
              navigation.navigate('Create');
            }
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  itemWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#Ee9e16'
  },
  rowInfo: {
    flexDirection: 'row',
    margin: 5,
  },
  info: {
    fontWeight: '600',
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 19,
    marginHorizontal: 70,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: "#000000",
    shadowRadius: 3
  },
  arrow: {
    fontSize: 48,
    color: 'white'
  },
  cornContainer: {
    backgroundColor: 'red'
  },
  floatbtn: {
    marginleft: 50
  },
  headerBtn: {
    margin: 10
  },
  header: {
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  searchBar:{
    marginTop:'3%'
  },
  buttonImageIconStyle: {
    padding: 10,
    height:'7%',
    width: '7%',
  },
  headerIcon: {
    flex: 1,
    alignItems: "flex-end",
    marginBottom:'6%',
    marginRight:'5%',
    marginTop:'2%'
  },
});

export default RoomScreen;