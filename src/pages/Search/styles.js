import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding-top: 15px;
    background-color: #e1e8ed;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    margin: 10px;
    background-color: #f1f1f1 ;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    border-width: 0.2px;
    border-color: #000;
`;

export const Input = styled.TextInput`
    width: 90%;
    background-color: #f1f1f1;
    height: 50px;
    padding-left: 8px;
    font-size: 17px;
    color: #121212;
`;

export const List = styled.FlatList`
    flex: 1;
`;