import * as React from 'react'
import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SessionState } from '../store/sessionStore';

export default () => {
    const jwt = useSelector((state: any) => state.session.jwt )
    return (
        <View>
            <Text> jwt: </Text>
            <Text> { jwt } </Text>
        </View>
    );
}