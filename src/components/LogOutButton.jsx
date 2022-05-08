import React from 'react';
import firebase from 'firebase';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogOutButton(){
    const navigation = useNavigation(); //このコンポーネントは定義App.jsxで定義していないので、navigationの定義が必要。

    function handlePress(){
        firebase.auth().signOut()
            .then(()=>{

                navigation.reset({
                    index: 0,
                    routes: [{name: 'LogIn'}],
                });
            })
            .catch(() =>{
                Alert.alert('ログアウトに失敗しました');
            })
    }
    return(
        <TouchableOpacity onPress = {handlePress} style={styles.container}>
            <Text style={styles.label}>ログアウト</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    label: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
});