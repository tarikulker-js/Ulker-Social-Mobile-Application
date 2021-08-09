import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, Alert, Modal, Pressable, Form, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { MaterialIcons} from 'react-native-vector-icons';
import axios from 'axios';

function AppBarComponent(props){
  var [users, setUsers] = React.useState(null);
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

  return(
    <>
      <Appbar style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 20,
        zIndex: 999999
      }}>
        <MaterialIcons name="menu" size={35} onPress={() => props.navigation.openDrawer()} />
        <Text style={{ flex: 1, flaxWrap: 'wrap', fontSize: "24", textAlign: 'center', justifyContent: 'center' }}>Ulker Social</Text>
        <MaterialIcons name="search" size={35} onPress={() => props.navigation.navigate('SearchUsers')} />
      </Appbar>
    </>  
  )
}

export default AppBarComponent;