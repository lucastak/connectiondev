import React, {useRef, useContext} from 'react';
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import {Container, Header, Avatar, Name, ContentView, Content, Actions, LikeButton, Like, TimePost, AreaIcone} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconTrash from 'react-native-vector-icons/Feather';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../contexts/auth';


const HeartAnimated = Animatable.createAnimatableComponent(Icon)

export default function PostsList({data, userId}) {
    const navigation = useNavigation();
    const likeRef = useRef(null);
    const { user } = useContext(AuthContext);

    function formatTimePost() {
        //converter timestap para uma data
        const datePost = new Date(data.created.seconds * 1000);

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    }

    async function likePost(id, likes) {
        const docId = `${userId}_${id}`;
        likeRef.current.rubberBand();

        const doc = await firestore().collection('likes')
        .doc(docId).get();

        if(doc.exists){
            //remover like
            await firestore().collection('posts')
            .doc(id).update({
                likes: likes - 1
            })

            await firestore().collection('likes')
            .doc(docId).delete();
            return;
        }

        //dar like
        await firestore().collection('likes')
        .doc(docId).set({
            postId: id,
            userId: userId,
        })

        //somar +1 like
        await firestore().collection('posts')
        .doc(id).update({
            likes: likes + 1
        })
    }


    function deletePost(userID){
        if(userID != user.uid){
            alert('Você não pode deletar um post de outro usuário')
            return;
        }

        Alert.alert(
            'Cuidado!',
            'Você realmente deseja excluir o post?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: () => deletePostSucess(data)
                }
            ]
        )

    }

    async function deletePostSucess(data) {
        await firestore().collection('posts')
        .doc(data.id)
        .delete()
        .then(() =>{
            console.log('Post deletado' + data.id);
        })
        .catch((error) => {
            console.log('Error: '  + error)
        })

    }
    
    return (
        <Container>
            <Header onPress={() => navigation.navigate('PostsUser', {title: data.autor, userId: data.userId}) }>
                { 
                    data.avatarUrl ? 
                    (
                        < Avatar source={{uri: data.avatarUrl}} />
                    ) : 
                    (
                        <Avatar source={require('../../assets/avatar.png')}/>
                    ) 
                }
                <Name>{data?.autor}</Name>

                <AreaIcone onPress={() => deletePost(data.userId)}>
                    <IconTrash name="trash" size={20} color="#000" />
                </AreaIcone>
            </Header>

            <ContentView>
                <Content>{data?.content}</Content>
            </ContentView>

            <Actions>
                <LikeButton onPress={() => likePost(data.id, data.likes) } >
                    <Like>{data?.likes === 0 ? '' : data?.likes}</Like>
                    <HeartAnimated
                        ref={likeRef}
                        name={data?.likes === 0 ? 'heart-plus-outline' : 'cards-heart'} 
                        size={20} 
                        color='#e52246' 
                        />
                </LikeButton>
                <TimePost>
                    {formatTimePost()}
                </TimePost>
            </Actions>
        </Container>
    );
}