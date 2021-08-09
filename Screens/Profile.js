import React from 'react';
import { View, Text, Dimensions, Image, FlatList, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { API_URL } from '../config.json';
import Appbar from '../components/AppBar';
import LocalStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MyProfile from './MyProfile';
import UserProfile from './UserProfile';


function ProfileScreen({ route, navigation }){
  React.useEffect(() => {
    if(route.params.userId == null){

    }else{
      navigation.navigate('UserProfile', {
        userId: route.params.userId
      })
    }
  })

  return(
    <View>
      <Text>{route.params.userId}</Text>
      {
        route.params.userId == undefined ? <MyProfile /> : <Text>Other Profile Screen</Text>
      }
    </View>
  )
}

export default ProfileScreen;