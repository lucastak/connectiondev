import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
    const { signed, loading } = useContext(AuthContext);

    if(loading){
        return(
            <View 
            style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e1e8ed'
            }}
            >
                <ActivityIndicator size={50} color="#1da1f2" />
            </View>
        );
    }

 return (
   signed ? <AppRoutes/> : <AuthRoutes/>
  );
}

export default Routes;