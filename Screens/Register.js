import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from 'react-native-vector-icons';
import { API_URL } from '../config.json';
import LocalStorage from '@react-native-async-storage/async-storage';

function RegisterScreen(props){
  var [name, setName] = React.useState();
  var [email, setEmail] = React.useState();
  var [password, setPassword] = React.useState();
  
  var [message, setMessage] = React.useState();
  var [isLoading, setLoading] = React.useState(false);

  const window = Dimensions.get("window");
  const opacity = React.useRef(new Animated.Value(0))
    .current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      
    });
  })

  function Register(){
    setMessage(null);
    setLoading(true);

    fetch(`${API_URL}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
        email,
        password,
			})
		})
		.then(res => res.json())
		.then(data => {
      setLoading(false);

      alert(data.error);
      if(!data.error){
        props.navigation.navigate('Login');
      }
		})
		.catch(err => alert("Sunucuya Bağlanılamadı. Lütfen internet bağlantınızı kontorl ediniz. "))

  }

  return(
    <View style={{ flex: 1, justifyContent: 'center' }}>
    {message ? <Animated.View style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
        flexWrap: "wrap"
      }}><Text style={{ textAlign: 'center', flexWrap: "wrap" }}><MaterialIcons name="error-outline" style={{ color: "red" }} size={25} />{message}</Text></Animated.View> : <></>}
      <Text style={{ fontSize: 30, textAlign: 'center' }}>Here is Register Screen </Text>
      
      <TextInput label="Tam Ad " value={name} onChangeText={((value) => setName(value))} />
      <Text>{"\n"}</Text>
      <TextInput label="Email" value={email} onChangeText={((value) => setEmail(value))} />
      <Text>{"\n"}</Text>
      <TextInput label="Şifre" value={password} onChangeText={(value) => setPassword(value)} keyboardType="number" />
      
      <Text>{"\n"}{"\n"}</Text>

      {
        isLoading == true || email == "" || email == null || password == "" || password == null
          ?
        <Button icon="register" mode="contained" disabled >
          Giriş Yap
        </Button>
          :
        <Button icon="register" mode="contained" onPress={() => Register()} >
          Giriş Yap
        </Button>
      }
    </View>
  )
}

export default RegisterScreen;