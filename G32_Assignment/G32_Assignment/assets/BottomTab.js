import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'; 

const BottomTab = ({ navigation }) => {
  const route = useRoute();

  // Define the names of your tabs
  const homeTabName = 'HomeScreen';
  const profileTabName = 'UserdataScreen';

  // Function to determine if a tab is currently active
  const isTabActive = (tabName) => {
    return route.name === tabName;
  };

  return (
    <View style={styles.taskBar}>
      <TouchableOpacity
        style={styles.taskBarButton}
        onPress={() => {
          // Only navigate if the Home tab is not already active
          if (!isTabActive(homeTabName)) {
            navigation.navigate(homeTabName);
          }
        }}
        disabled={isTabActive(homeTabName)} // Disable the button if it's already active
      >
        <Icon name="home" size={24} color={isTabActive(homeTabName) ? 'white' : 'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.taskBarButton}
        onPress={() => {
          // Only navigate if the Profile tab is not already active
          if (!isTabActive(profileTabName)) {
            navigation.navigate(profileTabName);
          }
        }}
        disabled={isTabActive(profileTabName)} // Disable the button if it's already active
      >
        <Icon name="user" size={24} color={isTabActive(profileTabName) ? 'white' : 'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  taskBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTab;
