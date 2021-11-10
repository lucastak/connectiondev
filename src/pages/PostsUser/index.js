import React, {useEffect, useLayoutEffect, useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, View } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import PostsList from '../../components/PostsList';
import { Container, ListPosts } from './styles';
import {AuthContext} from '../../contexts/auth';

export default function PostsUser({ route }) {
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params.title);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === '' ? '' : title
    });
  }, [navigation, title]);

  useEffect(() => {

    const  subscriber = firestore().collection('posts')
    .where('userId', '==', route.params.userId)
    .orderBy('created', 'desc')
    .onSnapshot( snapshot => {
      const postList = [];

      snapshot.forEach( doc => {
        postList.push({
          ...doc.data(),
          id: doc.id
        });
      });

      setLoading(false);
      setPosts(postList);

    })

    return () => subscriber();

  }, [])

  return (
    <Container>
      {
        loading ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={45} color="#1da1f2" />
          </View>
        ) :
        (
          <ListPosts
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <PostsList data={item} userId={user.uid} /> }
          />
        )
      }
    </Container>
  );
}