import React from 'react';
import { View, Text, Image, Dimensions, Alert, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import Appbar from '../components/AppBar'
import { API_URL } from '../config.json';

function SearchUsers({ navigation }){
  var [users, setUsers] = React.useState(null);
  const window = Dimensions.get('window');
  
  return(
    <>
      <Appbar navigation={navigation} />
      <View style={{ width: window.width, position: 'absolute', top: 80, alignItems: 'center' }}>
        <TextInput label="Email ya da Tam Ad" style={{ width: window.width }} onChangeText={(value) => {
          axios.post(`${API_URL}/search-users`, { query: value })
          .then((getedUsers) => {
            setUsers(getedUsers.data.users);
            
          }).catch((err) => alert(err))

        }} />

        <View style={{ position: 'absolute', top: 90 }}>
          {
              !users || users == "null" || users == "" || users.length == 0
                ?
              <Text> Kullanıcı Yok. </Text>
                :
              <ScrollView>
                {users.map((user) => {
                  return(
                    <>
                      <View style={{ backgroundColor: "red", width: window.width, height: 60, flex: 1, flexWrap: 'wrap' }}>
                        <Image source={{ uri: user.pic }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                        <Text style={{ fontSize: 20, position: 'absolute', top: 20, left: 70 }}>{user.name}</Text>
                        <Text style={{ fontSize: 15, position: 'absolute', top: 45, left: 70 }}>{user.email}</Text>


                      </View>

                      <Text>{"\n"}</Text>
                    </>
                  )
                })}
              </ScrollView>
                
          }
        </View>
      </View>
    </>
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

