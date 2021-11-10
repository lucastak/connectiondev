import React, {useState, useContext} from 'react';
import {Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator, LogBox} from 'react-native';
import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText, AreaInput, AreaMascara } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {AuthContext} from '../../contexts/auth';
import * as Animatable from 'react-native-animatable';
const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function Login() {

  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  const { signIn, signUp, loadingAuth } = useContext(AuthContext);

  const [mascara, setMascara] = useState(true);
  const [login, setLogin] = useState(true);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function toggleLogin(){
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }

  //login
  function handleLogin(){
    if (email === '' || password === '') {
      console.log('Preencha todos os campos');
      return;
    }

    signIn(email, password);
  }

  //cadastrar
  function handleSignUp(){
    if(name === '' || password === '' || email === ''){
      console.log('preencha todos os campos');
      return;
    }
    
    signUp(email, password, name);
  }

  if(login){
    return(
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()} }>
        <Container>
          <TitleAnimated animation="flipInY">Connection<Text style={{color: '#1da1f2'}}>Dev</Text></TitleAnimated>

          <AreaInput>
            <Input 
            placeholder="email@email.com"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize='none'
            />
          </AreaInput>

          <AreaInput>
            <Input 
            placeholder="*******"
            secureTextEntry={mascara}
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize='none'
            />

            <AreaMascara onPress={() => setMascara(!mascara)}>
              <Icon name={mascara ? 'eye' : 'eye-off'} size={20} color='#000' />
            </AreaMascara>
          </AreaInput>
        

          <Button onPress={() => handleLogin()}>
            {loadingAuth? (
              <ActivityIndicator size={20} color='#fff' />
            ) : (
              <ButtonText>Acessar</ButtonText>
            ) }
          </Button>

          <SignUpButton onPress={() => toggleLogin()}>
            <SignUpText>Criar uma conta</SignUpText>
          </SignUpButton>
        </Container>
      </TouchableWithoutFeedback>
    );
  }else{
      return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()} }>
          <Container>
            <TitleAnimated animation="flipInY">Connection<Text style={{color: '#1da1f2'}}>Dev</Text></TitleAnimated>

            <AreaInput>
              <Input 
              placeholder="Nome"
              onChangeText={(text) => setName(text)}
              value={name}
              />
            </AreaInput>

            <AreaInput>
              <Input 
              placeholder="email@email.com"
              onChangeText={(text) => setEmail(text)}
              value={email}
              autoCapitalize='none'
              />
            </AreaInput>

            <AreaInput>
              <Input 
              placeholder="*******"
              secureTextEntry={mascara}
              onChangeText={(text) => setPassword(text)}
              value={password}
              autoCapitalize='none'
              />

              <AreaMascara onPress={() => setMascara(!mascara)}>
                <Icon name={mascara ? 'eye' : 'eye-off'} size={20} color='#000' />
              </AreaMascara>
            </AreaInput>
          

            <Button onPress={() => handleSignUp()}>
              {loadingAuth? (
                <ActivityIndicator size={20} color='#fff' />
              ) : (
                <ButtonText>Cadastrar</ButtonText>
              ) }
            </Button>

            <SignUpButton onPress={() => toggleLogin()} >
            <SignUpText>Já tenho uma conta</SignUpText>
          </SignUpButton>

          </Container>
        </TouchableWithoutFeedback>
      );
    }
}