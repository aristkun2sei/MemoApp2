import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Alert, Text } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props){
    const { navigation } = props;
    const [ memos, setMemos ] = useState([]);
    const [isLoading, setLoading] = useState(false);
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
            setLoading(true);
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
                setLoading(false);
            },(error) =>{
                console.log(error);
                setLoading(false);
                Alert.alert('データの読み込みに失敗しました。');
            });
        }
        return unsubscribe;
    }, []);

    if (memos.length === 0) { //メモが0件のときの対応
        return (
            <View style={emptyStyles.container}>
                <Loading isLoading={isLoading} />
                <View style={emptyStyles.inner}>
                    <Text style={emptyStyles.title}>最初のメモを作成しよう</Text>
                    <Button
                        style={emptyStyles.button}
                        label = '作成する'
                        onPress = {() =>{ navigation.navigate('MemoCreate') ;}} />
                </View>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Loading isLoading ={ isLoading }/>
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

const emptyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 18,
        marginBottom: 24,
    },
    button: {
        alignSelf: 'center', //スタイルを中央に寄せる=alignself
    },
});
