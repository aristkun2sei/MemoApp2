import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput,Alert
}from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';

import KeyboardSafeView from '../components/KeyboardSafeView';
import CircleButton from '../components/CircleButton';


export default function MemoEditScreen(props){
    const { navigation, route } = props;
    const { id, bodyText } = route.params;
    const [body, setBody] = useState(bodyText);

    function handlePress(){
        const { currentUser } = firebase.auth();
        if(currentUser){
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);//単一のドキュメントへの参照
            ref.set({ //内容を変更する場合は、setを使う
                bodyText: body,
                updatedAt: new Date(),
            })
            .then(()=>{
                navigation.goBack();
            })
            .catch((error) =>{
                Alert.alert(error.code);
            });
        }
    }
    return(
        <KeyboardSafeView style={styles.container} behavior = 'height' >
            <View style={styles.inputContainer}>
                <TextInput
                    value = {body}
                    multiline
                    style={styles.input}
                    onChangeText = { (text) =>{ setBody(text); }} //ユーザが入力する度にbodyの中身をセットして、onChangeで表示する。
                />
            </View>
            <CircleButton
            name='check'
            onPress={ handlePress }
            />
        </KeyboardSafeView>
    );
}

MemoEditScreen.propTypes = {
    route: shape({
        params: shape({ id: string }),
    }).isRequired,
};


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
