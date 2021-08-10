import ConnectionInfo from '@react-native-community/netinfo';

export const checkConnection = () => {
  return ConnectionInfo.fetch().then((connection) => {
    console.log("Connection type: " + connection.type);
    console.log("Connection Checked?" + connection.isConnected);
    
  })
}