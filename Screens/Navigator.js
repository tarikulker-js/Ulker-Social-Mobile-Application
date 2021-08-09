import React from 'react';
import { View, Text } from 'react-native';

function Navigator({ navigation }){
  React.useEffect(() => {
    navigation.navigate('Profile', {
      userId: null
    })
  })

  return(
    <View>
      <Text>Hellö</Text>
    </View>
  )
}

export default Navigator;