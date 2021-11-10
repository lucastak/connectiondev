import React, {useContext, useState, useEffect} from 'react';
import { Modal, Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import  ImagePicker from 'react-native-image-picker';

import {AuthContext} from '../../contexts/auth';
import {Container, UpLoadButton, UpLoadText, Avatar, Name, Email, Button, ButtonText, ModalContainer, ButtonBack, Input} from './styles';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Feather';

export default function Profile() {
  const { signOut, user, storageUser, setUser } = useContext(AuthContext);
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(user?.nome);

  useEffect(() => {
    async function load() {
      try {
        let response = await storage().ref('users').child(user?.uid).getDownloadURL();
        setUrl(response)
        } catch (error) {
          console.log('ERROR, nenhuma imagem foi encontrada');
        }
    }

    load();
    
  }, []) 
 
  //Atualizar perfil
  async function updateProfile(){
    if(nome === ''){
      return;
    }

    await firestore().collection('users')
    .doc(user.uid).update({
      nome: nome
    })

    //buscar posts do usuario
    const postDocs = await firestore().collection('posts')
    .where('userId', '==', user.uid).get();

    postDocs.forEach( async doc => {
      await firestore().collection('posts').doc(doc.id).update({
        autor: nome
      })
    })

    let data = {
      uid: user.uid,
      nome: nome,
      email: user.email
    };

    setUser(data);
    storageUser(data);
    setOpen(false);
  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    };

    ImagePicker.launchImageLibrary(options, response => {
      if(response.didCancel){
        console.log('Cancelou');
      }
      else if(response.error){
        console.log('Gerou um erro: ' + response.error);
      }else{
        uploadFileFirebase(response)
        .then(() => {
          uploadAvatarPosts();
        })
        setUrl(response.uri);
      }
    })
  }

  const getFileLocalPath = response => {
    const { path, uri} = response;
    return Platform.OS === 'android' ? path : uri;
  }

  const uploadFileFirebase = async response => {
    const fileSource = getFileLocalPath(response);
    console.log('Imagem selecionada:' + fileSource);
    const storageRef = storage().ref('users').child(user?.uid);
    return await storageRef.putFile(fileSource);
  };

  async function uploadAvatarPosts(){
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef.getDownloadURL()
    .then(async image => {
      const postDocs = await firestore().collection('posts')
      .where('userId', '==', user.uid).get();

      postDocs.forEach( async doc => {
        await firestore().collection('posts').doc(doc.id).update({
          avatarUrl: image 
        })
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <Container>
      <Header />

      {
        url ? (
          <UpLoadButton onPress={uploadFile}>
          <UpLoadText>+</UpLoadText>
            <Avatar 
            source={{uri: url}}
            />
          </UpLoadButton>
        ) :

        (
          <UpLoadButton onPress={uploadFile}>
            <UpLoadText>+</UpLoadText>
          </UpLoadButton>
        )

      }

      <Name numberOfLines={1}>{user.nome}</Name>
      <Email numberOfLines={1}>{user.email}</Email>

      <Button bg="#428cfd" onPress={() => setOpen(true)}>
        <ButtonText color="#F5F8FA">Atualizar Perfil</ButtonText>
      </Button>

      <Button bg="#657786" onPress={() => signOut()}>
        <ButtonText color="#F5F8FA">Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType="slide" transparent={true} >
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
            <Icon name="arrow-left" size={22} color="#121212"  />
            <ButtonText color="#14171A">Voltar</ButtonText>
          </ButtonBack>

          <Input 
          placeholder={user?.nome}
          value={nome}
          onChangeText={(text) => setNome(text)}
          />

          <Button bg="#428cfd" onPress={updateProfile}>
            <ButtonText color="#F5F8FA">Atualizar</ButtonText>
          </Button>

        </ModalContainer>
      </Modal>

    </Container>
  );
}