import React from 'react';
import { View, Text, Dimensions, Image, FlatList, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { API_URL } from '../config.json';
import Appbar from '../components/AppBar';
import LocalStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function MyProfileScreen({ navigation }){
  const window = Dimensions.get("window");
  var [gallery, setGallery] = React.useState(null)
  var [jwt, setJwt] = React.useState("");
  var [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    LocalStorage.getItem("jwt")
    .then((getedJwt) => {
        setJwt(getedJwt);
        
        //alert("jwt", jwt);

        fetch(`${API_URL}/mypost`, {
          type: "POST",
          headers: {
            "Authorization": "Bearer " + getedJwt
          }
        }).then(res => res.json())
        .then(result => {
          //alert(result.myPosts[0].picture);

          if(gallery){
            axios.post(`${API_URL}/`, {
              test: 'is true',
              gallery: gallery
            })
          }else if(!gallery){

          }else{

          }

          setGallery(result.myPosts);
          //alert("myposts error", result.error)
          //alert("myposts message", result.message)
          
        })
        .catch(err => {
          //console.log(err)
        })

        
        fetch(`${API_URL}/profile`, {
          type: "POST",
          headers: {
            "Authorization": "Bearer " + getedJwt
          }
        }).then(res => res.json())
        .then(result => {
          //console.log(result)
          setUserProfile(result.user)

          //alert("prfile error", result.error)
          //alert("prfile message", result.message)
          
        })
        .catch(err => {
          //console.log(err)
        })
        
      })

    }, [])

  return(
    <View>
      <Appbar navigation={navigation} />
      
      <View style={{ backgroundColor: 'gray', width: window.width, height: 40, position: 'absolute', left: 0, right: 0, top: 76, zIndex: 99999, alignItems: 'center', justifyContent: 'center' }}>
        {
          userProfile == null ? <Text style={{ textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Y??kleniyor... </Text> : <Text style={{ textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>{userProfile.name}</Text>
        }
      </View>
      
      <Text>{"\n"}</Text>

      <View style={{ zIndex: 9999999999999, flex: 1, flexWrap: 'wrap' }}>
        {
          userProfile == null ? <Image style={{ width: 100, height: 100, borderRadius: 50, position: 'absolute', top: 100 }} source={{ uri: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" }} /> : <Image style={{ width: 100, height: 100, borderRadius: 50, position: 'absolute', top: 100 }} source={{ uri: userProfile.pic }} />
        }
        
        {
          userProfile == null ? <Text style={{ position: 'absolute', top: 128.5, left: 150, fontSize: 20}}>0 Takip??i 0 Takip</Text> : <Text style={{ position: 'absolute', top: 128.5, left: 150, fontSize: 20}}>{userProfile.followers.length} Takip??i {userProfile.following.length} Takip</Text>
        }
        
        <Button style={{ position: 'absolute', top: 152.5, left: 130, backgroundColor: 'black', color: "red" }}>Profilini D??zenle</Button>
      </View>

      <View style={{ zIndex: 9999999999999999999, position: 'absolute', top: 230 }}>
        {
          userProfile == null ? <Image source={{ uri: 'https://codinhood.com/930778a6211d120497ae5319c51763bc/loading.gif' }} /> : <Text style={{ fontWeight: 'bold' }}> {userProfile.name} </Text>
        }

        {
          userProfile == null ? <Text> Y??kleniyor... </Text> : <Text> {userProfile.bio} </Text>
        }

        <Text>{"\n"}</Text>
        
        {
          userProfile == null ? <Text>Y??kleniyor... </Text> :

          <Text style={{ position: 'absolute', top: 35, width: 500 }}??onPress={()??=>??{ 
  ????????????????????Linking.canOpenURL(userProfile.site).then(supported??=>??{ 
  ????????????????????????if(supported) {
  ????????????????????????????Linking.openURL(userProfile.site); 
  ????????????????????????}else{ 
  ????????????????????????????Alert.alert("Don't??know??how??to??open??URI:??"??+??userProfile.site); 
  ????????????????????????} 
  ????????????????????}); 

  ????????????????}}>{userProfile.site}</Text>
        }

      </View>

      <Text numberOfLines={1} style={{ position: "absolute", top: 260, left: 0, right: 0, fontSize: 40 }}>
       ______________________________________________________________
      </Text>

      {
        gallery == null ? <Text style={{position: 'absolute', top: 350, textAlign: 'center', fontSize: 45}} >Y??kleniyor...</Text> : 
        
        <View>
          <FlatList?? 
    ????????????????horizontal={false} 
    ????????????????numColumns={3} 
    ????????????????data={gallery} 
    ????????????????renderItem={({??item??})??=>?? 
    ????????????????????<Image source={{ uri: item.picture }} style={{ width: 100, height: 100 }} />
    ????????????????} 
    ????????????????style={{??position:??'absolute',??top:??310,??left:??10,??width:??window.width,??height:??185??}}

    ????????????/>
        </View>
      }

    </View>
  )
}

export default MyProfileScreen;