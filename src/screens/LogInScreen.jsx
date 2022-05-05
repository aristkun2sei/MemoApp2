import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Alert
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function LogInScreen(props){
    const { navigation } = props;
    const [email, setEmail] = useState(''); //useStateの中身は初期値
    const [password, setPassword] = useState('');

    function handlePress(){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) =>{
                const { user } = userCredential;
                console.log(user.uid);

                navigation.reset({
                    index: 0,
                    routes: [{name: 'SignUp'}],
                });
            })
            .catch((error) =>{
                Alert.alert(error.code);
            });


    }

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText ={(text) => { setEmail(text); }}//値を更新する
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Email Address'
                    textContentType='emailAddress'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => { setPassword(text); }}
                    autoCapitalize='none'//文頭の文字を小文字にする
                    placeholder='Password'//プレースホルダーの設置
                    secureTextEntry//パスワードが伏字になる。
                    textContentType='password'//キーチェーンからパスワードを拾ってくれるようになる。
                />
                <Button
                    label = 'Submit'
                    onPress =  {() => {
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'MemoList'}],//routeの中身で上書きするようにするという指示。indexは、stackの番号
                        });
                    }}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <TouchableOpacity
                        onPress = {handlePress}
                    >
                        <Text style={styles.footerLink}>Sign up here!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#f0f4f8',
    },
    inner: {
        paddingHorizontal: 27,
        paddingVertical: 24,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        fontSize: 16,
        height: 48,
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3',
    },
    footer: {
        flexDirection: 'row',
    },

});
