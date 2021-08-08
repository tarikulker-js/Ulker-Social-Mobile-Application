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

function LoginScreen(props){
  var [email, setEmail] = React.useState();
  var [password, setPassword] = React.useState();
  
  var [message, setMessage] = React.useState();
  var [isLoading, setLoading] = React.useState(false);
  var [jwt, setJwt] = React.useState();
  
  const window = Dimensions.get("window");
  const opacity = React.useRef(new Animated.Value(0))
    .current;

  React.useEffect(() => {
    LocalStorage.getItem("jwt")
    .then((getedJwt) => {
      setJwt(getedJwt);
      //alert(getedJwt);


    })

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

  function Login(){
    setMessage(null);
    setLoading(true);

    fetch(`${API_URL}/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				password,
				email
			})
		})
		.then(res => res.json())
		.then(data => {
      
      setLoading(false);

			if(data.error){
				setMessage(data.error);

			}else{
				LocalStorage.setItem("jwt", data.token);
				LocalStorage.setItem("userId", data.user);
				
				//console.log("DATA", data.user)
				//console.log("LOCALSTORAGE ID", localStorage.getItem("userId"))
				
			}
		})
		.catch(err => M.toast({html: "Sunucuya Bağlanılamadı. Lütfen internet bağlantınızı kontorl ediniz. ", classes: "red"}))

  }

  return(
    <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text>{jwt}</Text>
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
      <Text style={{ fontSize: 30, textAlign: 'center' }}> Ulker Social'a giriş yapın! </Text>
      
      <TextInput label="Email" value={email} onChangeText={((value) => setEmail(value))} keyboardType="email" />
      <Text>{"\n"}</Text>
      <TextInput label="Şifre" value={password} onChangeText={(value) => setPassword(value)} secureTextEntry={true}  />

      <Text>{"\n"}</Text>

      <Text style={{ fontSize: 20 }} onPress={() => props.navigation.navigate('Register') }>Kayıtlı değil misin? Hemen kayıt ol!</Text>
      <Text style={{ fontSize: 20, color: 'red' }} onPress={() => props.navigation.navigate('ForgotPassword') }>Şifremi unuttum!</Text>      
      <Text>{"\n"}</Text>

      {
        isLoading == true || email == "" || email == null || password == "" || password == null
          ?
        <Button icon="login" mode="contained" disabled >
          Giriş Yap
        </Button>
          :
        <Button icon="login" mode="contained" onPress={() => Login()} >
          Giriş Yap
        </Button>
      }
    </View>
  )
}

export default LoginScreen;