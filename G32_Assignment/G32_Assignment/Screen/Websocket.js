import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

var socket = io.connect('http://10.0.2.2:5000/chat', {   // Check your default gateway in emulator
  transports: ['websocket'],
});

export default class Websocket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      message: '',
      chatroom: '',
    };
    AsyncStorage.getItem('userData').then((userData) => {
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        this.setState({ name: parsedUserData.email });
      }
    });
    // When connected, emit a message to the server to inform that this client has connected to the server.
    // Display a Toast to inform the user that a connection was made.
    socket.on('connect', () => {
      console.log(socket.id);
      socket.emit('mobile_client_connected', { connected: true });
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    socket.on('connect_to_client', (data) => {
      let greets = JSON.parse(data);
      console.log(greets);
    });

    // Handle connection error
    socket.on('error', (error) => {
      console.log('WebSocket error:', error); 
      ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });

    // Receive chat broadcast from server.
    socket.on('message_broadcast', (data) => {
      console.log(data);
      let messageBag = JSON.parse(data);

      this.setState({
        chatroom:
          this.state.chatroom +
          `Message from Client:${messageBag.sender} at ${messageBag.timestamp}:\n
${messageBag.message}\n\n`,
      });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={this.state.name}
          selectTextOnFocus={true}
          onChangeText={(name) => {
            this.setState({ name });
          }}
        />
        <TextInput
          style={styles.output}
          value={this.state.chatroom}
          multiline={true}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter message..."
          placeholderTextColor="black"
          value={this.state.message}
          selectTextOnFocus={true}
          onChangeText={(message) => {
            this.setState({ message });
          }}
        />
          <TouchableOpacity
            onPress={() => {
              if (!this.state.message.trim()) {
                // Show a message or alert indicating that the message cannot be empty
                ToastAndroid.show('Message cannot be empty', ToastAndroid.SHORT);
                return;
              }

              socket.emit('message_sent', {
                sender: this.state.name,
                message: this.state.message,
              });

              // Clear the message input field after sending
              this.setState({ message: '' });
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Send</Text>
            </View>
          </TouchableOpacity>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 20,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  output: {
    height: 400,
    fontSize: 16,
    marginTop: 10,
    color:'black',
    marginBottom: 10,
    textAlignVertical: 'top',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,  
    borderColor: '#ccc',  
  },
  
  messageText: {
    color: 'black', 
  },
  button: {
    padding: 20,
    backgroundColor: 'blue',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8, 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
