import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, Pressable, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';


const RoomEditScreen = ({ navigation, route }) => {
  const post = route.params.post;
  const [id, setId] = useState(post.id);
  const[locationType,setLocationType]=useState(post.locationType);
  const [locationName, setname] = useState(post.locationName);
  const [locationDescription, setDescription] = useState(post.locationDescription);
  const [notes, setNotes] = useState(post.notes);
  const [floorNumber, setfloor] = useState(post.floorNumber);
  const [maxOccupancy, setoccupancy] = useState(post.maxOccupancy);
  const [loading, setLoading] = useState(false);
  const [isMaintenance, setIsMaintenance]=useState(post.isMaintenance);
const [isDeleted, setIsDeleted] = useState(post.isDeleted);
  const { user } = useContext(AuthContext);

  const editRoom = () => {
    setLoading(true);
    axios
      .put(
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

  return (
    <View style={styles.container}>
      <ScrollView>
      <Spinner visible={loading} />
      <Text style={styles.text1}>location type: </Text>
      <TextInput
        placeholder="dasdasdasd"
        style={styles.input}
        value={locationType}
        onChangeText={val => {
          setLocationType(val);
        }}
      />
      <Text style={styles.text1}>Tên phòng: </Text>
      <TextInput
        placeholder="Location Name"
        style={styles.input}
        value={locationName}
        onChangeText={val => {
          setname(val);
        }}
      />
      <Text style={styles.text1}>Mô tả: </Text>
      <TextInput
        placeholder='Description'
        style={styles.input}
        value={locationDescription}
        onChangeText={val => {
          setDescription(val);
        }}
      />
      <Text style={styles.text1}>Ghi chú: </Text>
      <TextInput
        placeholder='Note'
        style={styles.input}
        value={notes}
        onChangeText={val => {
          setNotes(val);
        }}
      />
      <Text style={styles.text1}>Tầng: </Text>
      <TextInput
        placeholder="Floor Number"
        style={styles.input}
        value={String(floorNumber)}
        onChangeText={val => {
          setfloor(val);
        }}
      />
      <Text style={styles.text1}>Sức chứa (Số người): </Text>
      <TextInput
        placeholder="Max Occupancy"
        style={styles.input}
        value={String(maxOccupancy)}
        onChangeText={val => {
          setoccupancy(val);
        }}
      />
      <Text style={styles.text1}>maitainanced: </Text>
      <TextInput
        placeholder=""
        style={styles.input}
        value={String(isMaintenance)}
        onChangeText={val => {
          setIsMaintenance(val);
        }}
      />
      <Text style={styles.text1}>Sức chứa (Số người): </Text>
      <TextInput
        placeholder="Max Occupancy"
        style={styles.input}
        value={String(isDeleted)}
        onChangeText={val => {
          setIsDeleted(val);
        }}
      />
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
                      editRoom();
                    },
                  },
                ],
                { cancelable: false }
              )
            }}>
            <Text style={styles.buttonText}>Cập nhật</Text>
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
            <Text style={styles.buttonText}>Xóa</Text>
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
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
  },
  text1: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 15
  },
  btnEdit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor:'#0096FF'
  },
  btnDel:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor:'#EE4B2B',
    marginLeft:10,
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
});

export default RoomEditScreen;
