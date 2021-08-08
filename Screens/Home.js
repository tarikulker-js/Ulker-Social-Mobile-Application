import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { AntDesign, EvilIcons } from 'react-native-vector-icons';
import LocalStorage from '@react-native-async-storage/async-storage';
import DoubleClick from 'react-native-double-tap';
import { API_URL } from '../config.json';

import AppBar from '../components/AppBar';

const LeftContent = props => <Image {...props} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWb2IMkiUnAGkm5UKuK1QSn9lOX8vwh6eIGugdE5ROofhKh4QQ4uyc9F4&s=10" }} style={{ width: 50, height: 50, borderRadius: 25 }} />

function HomeScreen({ navigation }){
  var [posts, setPosts] = React.useState("null");

  const window = Dimensions.get('window');
  
  var [jwt, setJwt] = React.useState();
  var [userId, setUserId] = React.useState();

  function updateInfos(){
    //alert("JWT: ", jwt);

    if(!jwt || jwt == undefined || jwt == null || jwt == "null" || jwt == ""){
      //alert("not send. " + jwt);

    }else{
      //alert("send. " + jwt);
      
      fetch(`${API_URL}/getsubpost`, {
        type: "POST",
        headers: {
          "Authorization": "Bearer " + jwt
        }
      }).then(res => res.json())
      .then(result => {
        //console.log("POSTS: ", result)

        if(result.error){
          //alert(result.error);
        }else if(result.message){
          //alert(result.message);
          setPosts(result.posts);

        }else{
          setPosts(result.posts);
        }
        
      })
      .catch(err => {
        //console.log(err)
      })
      
    }
    
  }

  React.useEffect(() => {
    LocalStorage.getItem("jwt")
    .then((jwt) => {
      setJwt(jwt);

      LocalStorage.getItem("userId")
      .then((userId) => {
        setUserId(userId);

        if(jwt == ""){
          alert("jwt alınıyor...");
        }else{
          updateInfos();
        }

      })
    })
  })

  function LikePost(id){
    Alert.alert("Like");

    fetch(`${API_URL}/like`,{				 
      method:"put",				 
      headers:{						
        "Content-Type":"application/json",						
        "Authorization":"Bearer "+ jwt				 
      },				 
      body: JSON.stringify({
        postId:id
      })
    }).then((res) => res.json())
    .then((result) => {
      
      updateInfos();

    })
  }

  function UnLikePost(id){
    fetch(`${API_URL}/unlike`,{				 
      method:"put",				 
      headers:{						
        "Content-Type":"application/json",						
        "Authorization":"Bearer "+ jwt				 
      },				 
      body: JSON.stringify({
        postId:id
      })
    }).then((res) => res.json())
    .then((result) => {
      
      updateInfos();

    })
  }

  return(
    <View>
      <AppBar navigation={navigation} />
      
      <ScrollView style={{
        width: window.width,
        height: window.height - 110,
        position: "absolute",
        top: 56
      }}>
        
        {
          posts !== "null" || !posts 
            ?
          posts.map((post) => {
            return(
              <>
                <Card>
                  <Card.Title title={post.postedBy.name} subtitle="" left={() => <Image source={{ uri: post.postedBy.pic }} style={{ width: 50, height: 50, borderRadius: 25 }} />} />
                  
                  <DoubleClick
                    doubleTap={() => {
                      if(post.likes.includes(userId) == false){
                        fetch(`${API_URL}/like`,{				 
                          method:"put",				 
                          headers:{						
                            "Content-Type":"application/json",						
                            "Authorization":"Bearer "+ jwt				 
                          },				 
                          body: JSON.stringify({
                            postId: post._id
                          })
                        }).then((res) => res.json())
                        .then((result) => {
                          updateInfos();

                        })
                      }else if(post.likes.includes(userId) == true){
                        fetch(`${API_URL}/unlike`,{				 
                          method:"put",				 
                          headers:{						
                            "Content-Type":"application/json",						
                            "Authorization":"Bearer "+ jwt				 
                          },				 
                          body: JSON.stringify({
                            postId: post._id
                          })
                        }).then((res) => res.json())
                        .then((result) => {
                          updateInfos();

                        })
                      }
                    }}
                    delay={200}
                  >
                    <Card.Cover source={{ uri: post.picture }} />
                  </DoubleClick>


                  <Card.Content>
                    <Text>{post.likes.length} Like</Text>
                    <Title>{post.title}</Title>
                    <Paragraph>{post.body}</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    {
                      post.likes.includes(userId) == true
                        ?
                      <AntDesign name="heart" size={35} style={{ color: "red" }} onPress={() => UnLikePost(post._id)} />
                        :
                      <AntDesign name="hearto" size={35} style={{ color: "red" }} onPress={() => LikePost(post._id)} />
                    }

                    <EvilIcons name="comment" size={35} style={{ color: "red" }} onPress={() => LikePost(post._id)} />

                  </Card.Actions>
                  <TextInput
                    label="Yorum yapın"
                  />
                </Card>
                <Text>{"\n"}{"\n"}</Text>
              </>
            )
          })
            :
          <Text>Yükleniyor...</Text>
        }
        
      </ScrollView>
    </View>
  )
}

export default HomeScreen;