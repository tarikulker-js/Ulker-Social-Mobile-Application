import React from 'react';
import { View, Text, Image, Dimensions, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import Appbar from '../components/AppBar'
import { API_URL } from '../config.json';

function SearchUsers(){
  var [users, setUsers] = React.useState(null);
  const window = Dimensions.get('window');
  
  return(
    <View style={{ width: window.width, position: 'absolute', top: 150, alignItems: 'center' }}>
      <TextInput label="Email ya da Tam Ad" style={{ width: window.width }} onChangeText={(value) => {
        axios.post(`${API_URL}/search-users`, { query: value })
        .then((getedUsers) => {
          setUsers(getedUsers.users);
          console.log(getedUsers);

          fetch(`${API_URL}/`, { body: JSON.stringify({ query: getedUsers })})

        }).catch((err) => alert(err))

      }} />

      {
          !users || users == "null" || users == "" || users.length == 0
            ?
          <Text> Kullanıcı Yok. </Text>
            :
          users.map((user) => {
            <View style={{ backgroundColor: 'red', width: window.width, height: 40 }}>
              <Image source={{ uri: user.pic }} style={{ width: 100, height: 100 }} />
              <Text>{user.name}</Text>
            </View>
          })
        }
    </View>
  )
}

export default SearchUsers;