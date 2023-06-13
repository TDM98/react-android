import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { BASE_URL } from '../config';
import { primary, borderColor } from './color';
import { AuthContext } from '../context/AuthContext';
import { floor, max } from 'react-native-reanimated';
import OutlineInput from 'react-native-outline-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input'
const PostCreateScreen = ({ navigation }) => {
  const [locationType, setLocatiobType] = useState(null);
  const [locationName, setName] = useState('');
  const [locationDescription, setDescription] = useState(null);
  const [notes, setNotes] = useState(null);
  const [floorNumber, setFloor] = useState(null);
  const [maxOccupancy, setOccupancy] = useState('');
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
        <Text style={styles.text1}>Loại phòng: </Text>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          value={locationType}
          maxLength={4}
          onChangeText={val => {
            setLocatiobType(val);
          }}
        />
        <Text style={styles.text1}>Tên phòng: </Text>
        <TextInput
          style={styles.input}
          value={locationName}
          maxLength={4}
          onChangeText={val => {
            setName(val);
          }}
        />
        <Text style={styles.text1}>Mô tả: </Text>
        <TextInput
          style={styles.input}
          value={locationDescription}
          maxLength={4}
          onChangeText={val => {
            setDescription(val);
          }}
        />
        <Text style={styles.text1}>Ghi chú: </Text>
        <TextInput
          style={styles.input}
          value={notes}
          maxLength={4}
          onChangeText={val => {
            setNotes(val);
          }}
        />
        <View style={styles.inputNum}>
        <Text style={styles.text1}>Tầng: </Text>
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

          iconStyle={{ color: 'black' }}
          rightButtonBackgroundColor='#FFDEAD'
          leftButtonBackgroundColor='#FFDEAD'
        />
        <Text style={styles.text1}>Sức chứa (người): </Text>
        <NumericInput
          value={maxOccupancy}
          onChange={val => {
            setOccupancy(val);
          }}
          onLimitReached={(isMax, msg) => console.log(isMax, msg)}
          iconSize={25}
          step={1}
          maxValue={6}
          minValue={0}
          valueType='real'
          rounded

          iconStyle={{ color: 'black' }}
          rightButtonBackgroundColor='#FF5733'
          leftButtonBackgroundColor='#FF5733'
        />
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
          <Text style={styles.buttonText}>Thêm mới</Text>
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
    backgroundColor: '#eee'
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
    fontSize: 15
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
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1F51FF',
    marginTop: 20,
  },
  inputNum:{
    flexDirection:'row',
    flex:1
  }
});

export default PostCreateScreen;
