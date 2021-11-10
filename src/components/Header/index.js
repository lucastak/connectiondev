import React from 'react';
import { View, Text } from 'react-native';
import {Container, Title} from './styles'

export default function Header() {
 return (
   <Container>
       <Title>Connection
           <Text style={{fontStyle: 'italic', color: '#1da1f2'}}>Dev</Text>
       </Title>
   </Container>
  );
}