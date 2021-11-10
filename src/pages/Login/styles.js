import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #e1e8ed;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    color: #14171a;
    font-size: 45px;
    font-weight: bold;
    font-style: italic;
`;

export const AreaInput = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #eee;
    width: 80%;
    border-radius: 7px;
    height: 50px;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    border-color: #14171a;
    border-width: 0.2;
`;

export const Input = styled.TextInput`
    width: 85%;
    height: 50px;
    font-size: 18px;
`;

export const AreaMascara = styled.TouchableOpacity`
    width: 15%;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.TouchableOpacity`
    width: 80%;
    background-color: #1da1f2;
    margin-top: 10px;
    height: 50px;
    border-radius: 7px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    font-size: 20px;
    color: #fff;
`;

export const SignUpButton = styled.TouchableOpacity`
    width: 100%;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
`;

export const SignUpText = styled.Text`
    color: #14171a;
    font-size: 15px;
`;

