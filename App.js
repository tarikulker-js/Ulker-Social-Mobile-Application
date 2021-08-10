import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Alert
} from 'react-native';
import { TouchableOpacity as TO } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome, EvilIcons, Ionicons, MaterialIcons} from 'react-native-vector-icons';
import LocalStorage from '@react-native-async-storage/async-storage';

import ConnectionInfo from '@react-native-community/netinfo';

//Screens
import HomeScreen from './Screens/Home';
import DiscoverScreen from './Screens/Discover';
import ProfileScreen from './Screens/Profile';
import UserProfileScreen from './Screens/UserProfile';
import SearchUsersScreen from './Screens/SearchUsers';
import NavigatorScreen from './Screens/Navigator';
import LogoutScreen from './Screens/Logout';
import LolScreen from './Screens/Lol';

import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import ForgotPasswordScreen from './Screens/ForgotPassword';

const Stack = createStackNavigator();
var Drawer = createDrawerNavigator();

const Navbar = () => {
  return(
    <View style={{ height: 55, flexWrap: "wrap", alignItems: 'center' }}>
      <FontAwesome name="home" size="45" style={{ alignItems: 'center', flexDirection: "row", marginLeft: 15 }} />
      <FontAwesome name="search" size="45" style={{ alignItems: 'center', flexDirection: "row", marginLeft:  30 }} />
      <EvilIcons name="user" size="60" style={{ alignItems: 'center', flexDirection: "row", marginLeft: 0 }} />
      <Ionicons name="add-circle-outline" size="50" style={{ alignItems: 'center', flexDirection: "row", marginLeft:  25 }} />
      
    </View>
  )
}

const App = ({ navigation }) => {
  var [jwt, setJwt] = React.useState();
  var [connnection, setConnection] = React.useState();

  React.useEffect(() => {
    setInterval(() => {
      LocalStorage.getItem("jwt")
      .then((jwt) => {
        setJwt(jwt);
      })

      ConnectionInfo.fetch().then((connection) => {
        console.log("Connection type: " + connection.type);
        console.log("Connection Checked?" + connection.isConnected);
        //alert(connection.type)

        setConnection(connection.isConnected);

      })
      
    }, 100)
  })

  return (
    connnection
      ?
    <NavigationContainer>
      {
        !jwt ?
        <Stack.Navigator detachInactiveScreens>
          <Stack.Screen name="Login" component={LoginScreen} options={{
            title: "Ulker Social'a Hoşgeldiniz!"
          }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{
            title: "Ulker Social'a Hoşgeldiniz!"
          }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{
            title: "Ulker Social'a Hoşgeldiniz!"
          }} />
        </Stack.Navigator>
        :
        <>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} options={{
              title: 'Ulker Social'
            }} />
            <Drawer.Screen name="Discover" component={DiscoverScreen} options={{
              title: 'Keşfet'
            }} />
            <Drawer.Screen name="Navigator" component={NavigatorScreen} options={{
              title: 'Profil',
            }} />
            <Drawer.Screen name="Search" component={SearchUsersScreen} options={{
              title: 'Kullanıcı Arayın',
            }} />
            <Drawer.Screen name="Logout" component={LogoutScreen} options={{
              title: 'Hoşçakalın 👋 '
            }} />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{
              title: '',
            }} />
            <Drawer.Screen name="UserProfile" component={UserProfileScreen} options={{
              title: '',
            }} />

          </Drawer.Navigator>
        </>
      }
    <Navbar />
  </NavigationContainer>
    :
    <Text>Lütfen internete bağlanınız. </Text>
  );
};

export default App;
