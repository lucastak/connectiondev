import React, { useState, useRef, useEffect, useContext} from 'react';
import { useNavigation } from '@react-navigation/native'
import {Container, Input, Button, ButtonText} from './styles';
import {AuthContext} from '../../contexts/auth';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function NewPost() {
  const [post, setPost] = useState('');
  const navigation = useNavigation();
  const refInput = useRef(null);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => { handlePost()}}> 
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [navigation, post])

  useEffect(() => {
    refInput.current.focus();
  }, [])

  async function handlePost(){
    if(post === ''){
      return;
    }

    let avatarUrl = null;
    try{
      let response = await storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = response;

    }catch(error){
      avatarUrl = null;
    }

    await firestore().collection('posts')
    .add({
      created: new Date(),
      content: post,
      autor: user.nome,
      likes: 0,
      avatarUrl,
      userId: user.uid,
    })
    .then(() => {
      setPost('')
      console.log('POST CRIADO COM SUCESSO');
    })
    .catch((error) => {
      console.log(error);
    })

    navigation.goBack();
  }

  return (
   <Container>
       <Input
       placeholder="O que está acontecendo?"
       placeholderTextColor="#000"
       multiline={true}
       maxLength={180}
       value={post}
       onChangeText={(text) => setPost(text)}
       autoCorrect={false}
       ref={refInput}
       />
   </Container>
  );
}