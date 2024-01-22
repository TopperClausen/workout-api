import * as React from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native';
import CustomInput from '../components/CustomInput';
import axios from 'axios';
import { setJwt } from '../store/sessionStore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const performLogin = () => {
        axios.post('http://10.0.2.2:3000/login', {
            email,
            password
        }).then(res => {
            dispatch(setJwt(res.data.data.jwt));
            navigation.navigate('Home');
        }).catch(err => {
            Alert.alert("Failed", JSON.stringify(err));
        })
    }

    return (
        <View>
            <CustomInput placeholder='Email' label="Email" onChange={setEmail} />
            <CustomInput placeholder='Password' label="Password" onChange={setPassword} />
            <Button title="Login" onPress={performLogin} />
        </View>
    );
}