import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput,TouchableOpacity
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function SignUpScreen(props){
    const { navigation } = props;
    const [email, setEmail] = useState(''); //useStateの中身は初期値
    const [password, setPassword] = useState('');

    function handlePress(){
        firebase.auth().createUserWithEmailAndPassword(email, password)//認証でメアドとパスを渡す
        .then((userCredential) => { //認証したあとの動き
            const { user } = userCredential;// userCredentialからuserを抽出する。
            console.log(user.uid);
            navigation.reset({
                index: 0,
                routes: [{name: 'MemoList'}],
            });
        })
        .catch((error) =>{ //エラーの対応を行う。アプリのクラッシュを防ぐ
            console.log(error.code, error.message);
        });

    }

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
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
                    onPress = {handlePress}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <TouchableOpacity
                        onPress = {() => {
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'LogIn'}],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Log In.</Text>
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
