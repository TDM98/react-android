import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { floor, max } from 'react-native-reanimated';
import OutlineInput from 'react-native-outline-input';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostCreateScreen = ({ navigation }) => {
  const [locationType, setLocatiobType] = useState(null);
  const [locationName, setName] = useState('');
  const [locationDescription, setDescription] = useState(null);
  const [notes, setNotes] = useState(null);
  const [floorNumber, setFloor] = useState(null);
  const [maxOccupancy, setOccupancy] = useState(null);
  const [isMaintenanced, setIsMaintenanced] = useState(null);
  const [isDeleted, setIsDeleted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({})
  const { user } = useContext(AuthContext);

  const createPost = () => {
    setLoading(true);

    axios
      .post(
        `${BASE_URL}/locations`,
        {
          locationType,
          locationName,
          locationDescription,
          notes,
          floorNumber,
          maxOccupancy,
          isMaintenanced,
          isDeleted,

        },
        { headers: { Authorization: `Bearer ${user.id_token}` } },
      )
      .then(res => {
        let post = res.data;
        setLoading(false);
        navigation.navigate('Room', {
          post: post,
        });
        console.log(res.data);
      })
      .catch(e => {
        setLoading(false);
        console.log(`Error on creating post ${e.message}`);
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

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <ScrollView>
        <Text style={styles.text1}>Tên phòng <Text style={styles.highlight}>(*)</Text></Text>
        <Input
          value={locationName}
          maxLength={50}
          onChangeText={val => {
            setName(val);
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
            setLocatiobType(val);
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
          <Text style={styles.text1}><Icon name='group' size={20} color='#5D3FD3' marginRight={20}/>  Số người  </Text>
          <NumericInput
            value={maxOccupancy}
            onChange={val => {
              setOccupancy(val);
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
          <Text style={styles.text1}><Icon name='building' size={20} color='#DAA520' marginRight={20}/>  Tầng  </Text>

          <View style={styles.NumericInput}>
            <NumericInput
              value={floorNumber}
              onChange={val => {
                setFloor(val);
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

        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed
                ? 0.2
                : 1,
            },
            styles.btnAdd,
          ]}
          onPress={() => {
            Alert.alert(
              'Thêm mới phòng',
              'Xác nhận thêm mới',
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
                    checkTextInput();
                  },
                },
              ],
              { cancelable: false }
            )
          }}>
          <Icon name='plus' size={18} color='white'>
            <Text style={styles.buttonText}>  Thêm mới</Text>
            </Icon>
        </Pressable>
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
    marginBottom: 20
  },
  text1: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 18
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  btnAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#1F51FF',
    marginVertical: 20
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

export default PostCreateScreen;
