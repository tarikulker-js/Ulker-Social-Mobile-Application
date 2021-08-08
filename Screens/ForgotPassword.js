import React from 'react';
import { View, Text, Dimensions, Animated, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';
import { API_URL } from '../config.json';
import LocalStorage from '@react-native-async-storage/async-storage';

function ForgotPasswordScreen(props) {
  var [email, setEmail] = React.useState();

  var [message, setMessage] = React.useState();
  var [isLoading, setLoading] = React.useState(false);

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

  function ForgotPassword() {
    setMessage(null);
    setLoading(true);

    fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);

          setTimeout(() => props.navigation.navigate('Login'), 3000)
        }
      })
      .catch((err) => Alert.alert(err));
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {message ? (
        <Animated.View
          style={{
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
            flexWrap: 'wrap',
          }}>
          <Text style={{ textAlign: 'center', flexWrap: 'wrap' }}>
            <MaterialIcons
              name="error-outline"
              style={{ color: 'red' }}
              size={25}
            />
            {message}
          </Text>
        </Animated.View>
      ) : (
        <></>
      )}

      <Text style={{ fontSize: 30, textAlign: 'center' }}>
        Şifrenizi Sıfırlayın
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <Text>{'\n'}</Text>

      {
        isLoading == true || email == '' || email == null  ? 
          <Button icon={() => <MaterialCommunityIcons name="lock-reset" size={24} />} mode="contained" disabled>
            Şifrenizi Sıfırlayın
          </Button>
      : 
        <Button icon={() => <MaterialCommunityIcons name="lock-reset" size={24} />} onPress={() => ForgotPassword()} >
          Şifrenizi Sıfırlayın
        </Button>
      }
    </View>
  );
}

export default ForgotPasswordScreen;
