import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, Pressable, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { Input } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const RoomEditScreen = ({ navigation, route }) => {
  const post = route.params.post;
  const [id, setId] = useState(post.id);
  const [locationType, setLocationType] = useState(post.locationType);
  const [locationName, setname] = useState(post.locationName);
  const [locationDescription, setDescription] = useState(post.locationDescription);
  const [notes, setNotes] = useState(post.notes);
  const [floorNumber, setfloor] = useState(post.floorNumber);
  const [maxOccupancy, setoccupancy] = useState(post.maxOccupancy);
  const [isMaintenance, setIsMaintenance] = useState(post.isMaintenance);
  const [isDeleted, setIsDeleted] = useState(post.isDeleted);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const editRoom = () => {
    setLoading(true);
    axios
      .patch(
        `${BASE_URL}/locations/${id}`,
        {
          id,
          locationType,
          locationName,
          locationDescription,
          notes,
          floorNumber,
          maxOccupancy,
          isMaintenance,
          isDeleted
        },
        {
          headers: { Authorization: `Bearer ${user.id_token}` },
        },
      )
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Room', {
          post: post,
        });
        console.log(`ok`)
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on updating post ${e.message}`);
      });
  };
  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!locationName.trim()) {
      alert(`Tên phòng không được để trống`);
      return;
    }
    createPost();
  };

  const deleteRoom = () => {
    setLoading(true);

    axios
      .delete(`${BASE_URL}/locations/${id}`, {
        headers: { Authorization: `Bearer ${user.id_token}` },
      })
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Room', { post: post });
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on deleting post ${e.message}`);
      });
  };

  const checkEditInput = () => {
    if(!locationName.trim()){
      alert('Tên phòng không được để trống');
      return;
    }
      editRoom();
  }
  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <ScrollView>
        <Text style={styles.text1}>Tên phòng <Text style={styles.highlight}>(*)</Text></Text>
        <Input
          value={locationName}
          maxLength={50}
          onChangeText={val => {
            setname(val);
          }}
          leftIcon={
            <Icon
              name='pencil'
              size={20}
              color='#DC143C'
              marginRight={20}
            />
          }
        />
        <Text style={styles.text1}>Loại phòng </Text>
        <Input
          value={locationType}
          maxLength={20}
          onChangeText={val => {
            setLocationType(val);
          }}
          leftIcon={
            <Ionicons
              name='pricetag-outline'
              size={20}
              marginRight={20}
            />
          }
        />

        <Text style={styles.text1}>Mô tả </Text>
        <Input
          value={locationDescription}
          maxLength={100}
          onChangeText={val => {
            setDescription(val);
          }}
          leftIcon={
            <Icon
              name='list-ul'
              size={20}
              marginRight={20}
            />
          }
        />
        <Text style={styles.text1}>Ghi chú </Text>
        <Input
          value={notes}
          maxLength={100}
          onChangeText={val => {
            setNotes(val);
          }}
          leftIcon={
            <Icon
              name='file-text'
              size={20}
              color='black'
              marginRight={20}
            />
          }
        />
        <View style={styles.inputNum}>
          <Text style={styles.text1}><Icon name='group' size={20} color='#5D3FD3' />  Số người  </Text>
          <NumericInput
            value={maxOccupancy}
            onChange={val => {
              setoccupancy(val);
            }}

            iconSize={25}
            step={1}
            maxValue={200}
            minValue={1}
            valueType='real'
            rounded
            totalHeight={40}
            iconStyle={{ color: 'black' }}
            rightButtonBackgroundColor='#d3eaf2'
            leftButtonBackgroundColor='#d3eaf2'
          />
        </View>

        <View style={styles.inputNum}>
          <Text style={styles.text1}><Icon name='building' size={20} color='#DAA520' />  Tầng  </Text>

          <View style={styles.NumericInput}>
            <NumericInput
              value={floorNumber}
              onChange={val => {
                setfloor(val);
              }}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              iconSize={25}
              step={1}
              maxValue={6}
              minValue={0}
              valueType='real'
              rounded
              totalHeight={40}
              iconStyle={{ color: 'black' }}
              rightButtonBackgroundColor='#d3eaf2'
              leftButtonBackgroundColor='#d3eaf2'
            />
          </View>
        </View>
        <View style={styles.btnView}>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed
                  ? 0.2
                  : 1,
              },
              styles.btnEdit,
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
                      checkEditInput();
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
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed
                  ? 0.2
                  : 1,
              },
              styles.btnDel,
            ]}
            onPress={() => {
              Alert.alert(
                'Xóa',
                'Xác nhận xóa',
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
                      deleteRoom();
                    },
                  },
                ],
                { cancelable: false }
              )
            }}>
            <MaterialCommunityIcons name='delete' size={20} color='white'>
              <Text style={styles.buttonText}>  Xóa</Text>
            </MaterialCommunityIcons>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: 'white'
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
  },
  text1: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 18
  },
  btnEdit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#1F51FF'
  },
  btnDel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#EE4B2B',
    marginLeft: 10,
  },
  btnView: {
    flexDirection: 'row',
    margin: 10
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  inputNum: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
    marginVertical: 10
  },
  highlight: {
    color: 'red'
  }
});

export default RoomEditScreen;
