import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
const image = { uri: 'https://e0.pxfuel.com/wallpapers/738/89/desktop-wallpaper-simple-minimalistic-best-phone-background-no-distractions-scenery-painting-nature-simple-sunset.jpg' };
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

const HomeScreen = (navigation,route) => {
  const [date, setDate] = useState(dayjs());
  useEffect(() => {
    let timer = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <ImageBackground source={image} style={StyleSheet.absoluteFill}>
      <View style={styles.header}>
        <Text style={styles.date}>{date.format("dddd, DD MMMM")}</Text>
        <Text style={styles.time}>{date.format("hh:mm")}</Text>
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <MaterialCommunityIcons name="calendar-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="account-group" size={24} color="white" />
        </View>
        <View style={styles.icon}>
          <Ionicons name="person-circle-outline" size={24} color="white" />
        </View>
        <View style={styles.icon}>
          <Ionicons name="md-settings-outline" size={24} color="white" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  },
  date: {
    color: "#C3FFFE",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,
  },
  time: {
    fontSize: 82,
    fontWeight: "bold",
    color: "#C3FFFE",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 75,
  },
  icon: {
    backgroundColor: "#00000050",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default HomeScreen;