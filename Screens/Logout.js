import React from 'react';
import { View, Text } from 'react-native';
import LocalStorage from '@react-native-async-storage/async-storage';

function Logout(){

  React.useEffect(() => {
    LocalStorage.setItem("jwt", "");
    LocalStorage.setItem("userId", "");
    
  }, [])

  return(
    <View>
      <Text>Çıkış Yapılıyor...</Text>
    </View>
  )
}

export default Logout;