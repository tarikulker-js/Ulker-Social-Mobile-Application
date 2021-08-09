import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, Alert, Modal, Pressable, Form, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { AntDesign, EvilIcons } from 'react-native-vector-icons';
import LocalStorage from '@react-native-async-storage/async-storage';
import DoubleClick from 'react-native-double-tap';
import { API_URL } from '../config.json';

import AppBar from '../components/AppBar';

const LeftContent = props => <Image {...props} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWb2IMkiUnAGkm5UKuK1QSn9lOX8vwh6eIGugdE5ROofhKh4QQ4uyc9F4&s=10" }} style={{ width: 50, height: 50, borderRadius: 25 }} />

function DiscoverScreen({ navigation }){
  var [posts, setPosts] = React.useState("null");
  var [comments, setComments] = React.useState("null");
  var [makedComment, setMakedComment] = React.useState("");
  
  const window = Dimensions.get('window');
  
  var [jwt, setJwt] = React.useState();
  var [userId, setUserId] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);

  function updateInfos(){
    //alert("JWT: ", jwt);

    if(!jwt || jwt == undefined || jwt == null || jwt == "null" || jwt == ""){
      //alert("not send. " + jwt);

    }else{
      //alert("send. " + jwt);
      
      fetch(`${API_URL}/allpost`, {
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

  function MakeComment(text, postId){
    alert(text);
    alert(postId);

    if(text === ""){
			alert("Boş yorum gönderilemez. ")
		}else if(text.length > 0){
			fetch(`${API_URL}/comment`,{
			method:"put",
			headers:{
				"Content-Type": "application/json",
				"Authorization":"Bearer " + jwt
			},
			body:JSON.stringify({
				postId: postId,
				text: text
			})
		}).then(res=>res.json())
		.then(result=>{
			updateInfos();
      alert(result.error);
      alert(result.message);

		})
	}
}

  return(
    <View>
      <AppBar navigation={navigation} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <Pressable
              style={[ styles.button, styles.buttonClose ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            
            <Text>{"\n"}</Text>

            <ScrollView>
              {
                  comments == "null" || comments == "" || comments.length == 0
                    ?
                  <Text> Yorum Yok. </Text>
                    :
                  comments.map((comment) => {
                    return(
                      <View style={{ flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Image source={{ uri: comment.postedBy.pic }} style={{ width: 20, height: 20, borderRadius: 25 }} />
                        <Text><Text style={{ fontWeight: 'bold'}}>{comment.postedBy.name}</Text> {comment.text}</Text>
                      </View>
                    )
                  })
                }
            </ScrollView>
            
          </View>
        </View>

      </Modal>
      
      <ScrollView style={{
        width: window.width,
        height: window.height - 110,
        position: "absolute",
        top: 74
      }}>
        
        {
          posts !== "null" || !posts 
            ?
          posts.map((post) => {
            return(
              <>
                <Card>
                  <TouchableOpacity onPress={() => {
                      Alert.alert("hello world")
                      navigation.navigate('Profile', {
                        userId: post.postedBy._id
                      })
                    }} >
                    <Card.Title title={post.postedBy.name} subtitle="" left={() => <Image source={{ uri: post.postedBy.pic }} style={{ width: 50, height: 50, borderRadius: 25 }} />} />
                  </TouchableOpacity>
                  
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

                    <EvilIcons name="comment" size={35} style={{ color: "red" }} onPress={() => {
                      setComments(post.comments);
                      setModalVisible(true);
                    }} />

                  </Card.Actions>
                  
                  <TextInput
                    label="Yorum yapın"
                    onChangeText={(value) => {
                      setMakedComment(value);

                    }}
                  />
                  <Button onPress={() => MakeComment(makedComment, post._id)} >Yorum Yap</Button>
                
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default DiscoverScreen;