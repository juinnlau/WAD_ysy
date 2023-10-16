import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  BackHandler,
  Alert,
  TextInput,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBars from '../assets/SideBars';
import UserdataScreen from './UserdataScreen';
import TestScreen from '../Database/Usermanagement';
import BottomTab from '../assets/BottomTab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NowPlaying from '../component/NowPlaying';
import Upcoming from '../component/Upcoming';
import Websocket from './Websocket';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const HomeScreenContent = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>What's Trending</Text>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: styles.tabLabel,
          style: styles.tabBar,
        }}>
        <Tab.Screen name="Now Playing" component={NowPlaying} />
        <Tab.Screen name="Upcoming Movies" component={Upcoming} />
      </Tab.Navigator>
      <BottomTab navigation={navigation} />
    </View>
  );
};

const HomeScreen = () => {
  return (
    <Drawer.Navigator drawerContent={props => <SideBars {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreenContent} />
      {/* <Drawer.Screen name="Movie List" component={CinemaHome} /> */}
      <Drawer.Screen name="Profiles" component={UserdataScreen} />
      <Drawer.Screen name="Support chat" component={Websocket} />
      <Drawer.Screen
        name="TestScreen Database for User"
        component={TestScreen}
      />
      
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  searchInput: {
    width: 150,
    height: 40,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 20,
    paddingLeft: 10,
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  
});

export default HomeScreen;