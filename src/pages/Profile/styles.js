import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #E1E8ED;
`;

export const UpLoadButton = styled.TouchableOpacity`
    margin-top: 13%;
    background-color: #fff;
    width: 165px;
    height: 165px;
    border-radius: 90px;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;

export const UpLoadText = styled.Text`
    z-index: 9;
    position: absolute;
    font-size: 55px;
    color: #1da1f2;
    opacity: 0.2;
`;

export const Avatar = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 80px;
    opacity: 0.9;
`;

export const Name = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: #14171A;
    margin: 20px 20px 0px 20px;
`;

export const Email = styled.Text`
    font-size: 20px;
    font-style: italic;
    margin: 9px 20px 10px 20px;
    color: #14171A;
`;

export const Button = styled.TouchableOpacity`
    width: 80%;
    height: 45px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.bg};
    margin-top: 12px;
    border-radius: 5px;
`;

export const ButtonText = styled.Text`
    font-size: 20px;
    color: ${props => props.color};
    font-weight: bold;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
    width: 100%;
    height: 70%;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
`;

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 18px;
    left: 25px;
    flex-direction: row;
    align-items: center;
`;

export const Input = styled.TextInput`
    width: 80%;
    height: 50px;
    background-color: #c1c1c1;
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
`;