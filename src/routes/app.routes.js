import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import NewPost from '../pages/NewPost';
import PostsUser from '../pages/PostsUser';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackScreen() {
  return(
    <Stack.Navigator
    initialRouteName='Home'
    >
      <Stack.Screen 
      name="Home" 
      component={Home}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen 
      name="NewPost"
      component={NewPost}
      options={{
        headerTitle: 'Novo Post',
        headerTintColor: '#fff',
        headerStyle:{
          backgroundColor: '#36393f'
        }
      }}
      />
      <Stack.Screen 
      name="PostsUser"
      component={PostsUser}
      options={{
        headerTintColor: '#fff',
        headerStyle:{
          backgroundColor: '#36393f'
        }
      }}
      />
    </Stack.Navigator>
  );

}


function AppRoutes() {
 return (
   <Tab.Navigator
   initialRouteName='Home'
   tabBarOptions={{
     keyboardHidesTabBar: true,
     showLabel: false,
     style:{
       backgroundColor: '#202225',
       borderTopWidth: 0,
     },
     activeTintColor: '#1da1f2',
     inactiveTintColor: '#fff'
   }}
   >
       <Tab.Screen 
       name="Home" 
       component={StackScreen}
       options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
       }}
       />
       <Tab.Screen 
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }} 
        />
       <Tab.Screen 
        name="Profile"
        component={Profile} 
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }} 
        />
   </Tab.Navigator>
  );
}

export default AppRoutes;