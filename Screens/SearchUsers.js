import React from 'react';
import { View, Text, Image, Dimensions, Alert, ScrollView } from 'react-native';
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
          setUsers(getedUsers.data.users);
          
        }).catch((err) => alert(err))

      }} />

      {
          !users || users == "null" || users == "" || users.length == 0
            ?
          <Text> Kullanıcı Yok. </Text>
            :
          <ScrollView>
            {users.map((user) => {
              return(
                <View style={{ backgroundColor: "red", width: window.width, height: 70, flex: 1, flexWrap: 'wrap' }}>
                  <Image source={{ uri: user.pic }} style={{ width: 50, height: 50 }} />
                  <Text>{user.name}</Text>
                  <Text style={{ fontSize: 15 }}>{user.email}</Text>

                </View>
              )
            })}
          </ScrollView>
            
      }
    </View>
  )
}

export default SearchUsers;

/*users.map((user) => {

            <View>

              <Image source={{ uri: user.pic }} style={{ width: 50, height: 50 }} />

              <Text>{user.name}</Text>

              <Text>{user.email}</Text>

            </View>

          })*/

