import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ImageBackground, Image } from 'react-native';
import { DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SideBars = (props) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Retrieve the user's email from AsyncStorage
    AsyncStorage.getItem('userData')
      .then((data) => {
        if (data) {
          const userData = JSON.parse(data);
          const userEmail = userData.email;
          setUserEmail(userEmail); // Set userEmail state
          console.log('User Email:', userEmail);
        } else {
          // Handle the case when no user data is found
        }
      })
      .catch((error) => {
        console.error('Error reading user data from AsyncStorage:', error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'white' }}>
        <ImageBackground source={require('../images/wallpaper.jpg')} style={{ padding: 25, marginTop: -8 }}>
          <Image source={require('../images/usericon.jpg')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}></Image>
          <Text style={{ color: "white" }}>{userEmail}</Text>

        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        {/* Additional content */}
      </View>
    </View>
  );
};

export default SideBars;
