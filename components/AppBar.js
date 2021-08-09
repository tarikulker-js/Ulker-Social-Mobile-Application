import React from 'react';
import { Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialIcons} from 'react-native-vector-icons';

function AppBarComponent(props){
  return(
    <Appbar style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 20,
      zIndex: 999999
    }}>
      <MaterialIcons name="menu" size={35} onPress={() => props.navigation.openDrawer()} />
      <Text style={{ flex: 1, flaxWrap: 'wrap', fontSize: "24", textAlign: 'center', justifyContent: 'center' }}>Ulker Social</Text>
    </Appbar>
  )
}

export default AppBarComponent;