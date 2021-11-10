import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #e1e8ed;
`;

export const ButtonPost = styled.TouchableOpacity`
    background-color: #202225;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 6%;
    right: 6%;
    border-radius: 30px;
`;

export const ListPosts = styled.FlatList`
    flex: 1;
    background-color: #e1e8ed;
`;