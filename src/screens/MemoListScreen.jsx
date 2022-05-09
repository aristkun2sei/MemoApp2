import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props){
    const { navigation } = props;
    const [ memos, setMemos ] = useState([]);
    useEffect( ()=>{ //memoListScreenが表示された瞬間一回だけ表示したいので、useEffectを使う。
        navigation.setOptions({ // ナビゲーションにログアウトボタンを設置する
            headerRight: ()=> <LogOutButton /> //componentを直接定義するための関数が必要。
        });
    }, []);

    useEffect( ()=>{ //データを取得する。（目的は、画面にメモの一覧を表示すること）
        const db = firebase.firestore();
        const { currentUser } = firebase.auth();
        let unsubscribe = ()=>{};// 何も入れないことで、変数である事の定義を行う（再代入をおこなうことができる）
        if (currentUser){ //必ずIDが存在するとは限らない（セッション切れなど）ので、if文で分岐
            const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt','desc');//日付の順番にコンソールに表示する。
            unsubscribe =  ref.onSnapshot ((snapshot) => {
                const userMemos = []; //documentから撮ってきたメモの情報を、reactで判断しやすいように加工するために配列に入れる。
                snapshot.forEach((doc) => {
                    console.log(doc.id, doc.data());
                    const data = doc.data();
                    userMemos.push({ //pushは配列の中に要素を1つずつ入れることができる。
                        id: doc.id,
                        bodyText: data.bodyText,
                        updatedAt: data.updatedAt.toDate(),// JSの日付に変更する操作
                    });
                });
                setMemos(userMemos);
            },(error) =>{
                console.log(error);
                Alert.alert('データの読み込みに失敗しました。');
            });
        }
        return unsubscribe;
    }, []);

    return(
        <View style={styles.container}>
            <MemoList memos={memos} />
            <CircleButton
                name= 'plus'
                onPress={() => { navigation.navigate('MemoCreate'); }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
});
