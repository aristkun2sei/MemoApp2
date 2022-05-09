import React, { useState } from 'react';
import {
    View, StyleSheet, TextInput, KeyboardAvoidingView,
}from 'react-native';
import KeyboardSafeView from '../components/KeyboardSafeView';

import CircleButton from '../components/CircleButton';

import firebase from 'firebase';

export default function MemoCreateScreen(props){
    const { navigation } = props;
    const [bodyText, setBodyText] = useState('');

    function handlePress(){
        const { currentUser } = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`users/${currentUser.uid}/memos`); //referenceの設定、データを保存するコレクションの名前を決めている。
        ref.add({ //documentを追加するための関数
            bodyText,
            updatedAt: new Date(),
        })
            .then((docRef)=>{ //作成されたドキュメントの参照
                console.log('Created!', docRef.id );
                navigation.goBack();
            })
            .catch((error) =>{
                console.log('Error!', error);
            });
    }

    return(
        <KeyboardSafeView style={styles.container} behavior = 'height' >
            <View style={styles.inputContainer}>
                <TextInput
                    value = {bodyText}
                    multiline
                    style={styles.input}
                    onChangeText ={(text) => { setBodyText(text); }}//入力されるごとにsetBodyTextが実行される。
                    autoFocus//ページに遷移した瞬間にキーボードが立ち上がって、入力できる状態になる。
                />
            </View>
            <CircleButton
                name='check'
                onPress = {handlePress}
            />
        </KeyboardSafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1,
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
    },
});
