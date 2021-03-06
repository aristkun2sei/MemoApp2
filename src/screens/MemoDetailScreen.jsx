import React, { useEffect, useState }from 'react';
import { shape, string } from 'prop-types';
import {
    View, ScrollView, Text, StyleSheet,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import { dateToString } from '../utils';

export default function MemoDetailScreen(props){
    const { navigation, route } = props;
    const { id } = route.params;// routeのなかに、paramsというのがある。idをMemoList→detail→editと渡していく
    console.log(id);
    const [memo, setMemo] = useState(null);

    useEffect(() =>{// 表示された瞬間に、DBからデータを取得している。
        const { currentUser } =firebase.auth();
        let unsubscribe = () =>{};//空の変数を定義する。
        if (currentUser){
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            const unsubscribe = ref.onSnapshot( (doc)=>{ //単一のドキュメントデータの場合、docで受け取る
                console.log(doc.id, doc.data());
                const data = doc.data();
                setMemo({
                    id: doc.id,
                    bodyText: data.bodyText,
                    updatedAt: data.updatedAt.toDate(),
                }); //setMemoに値をいれて、memoから画面の構造体に値を渡す。
            });
        }
        return unsubscribe;
    },[]);

    return(
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
                <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoText}>
                   {memo && memo.bodyText}
                </Text>
            </ScrollView>
            <CircleButton
            style={{ top: 60, bottom: 'auto' }} name = 'edit-2'
            onPress={()=>{navigation.navigate('MemoEdit', { id: memo.id, bodyText: memo.bodyText }); }}
            />

        </View>
    );
}

MemoDetailScreen.propTypes = {
    route: shape({
        params: shape({ id: string }),
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    memoHeader: {
        backgroundColor: '#467FD3',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19,

    },
    memoTitle: {
        color: '#ffffff',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold',
    },
    memoDate: {
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 16,
    },
    memoBody: {
        paddingVertical: 32,
        paddingHorizontal: 27,
    },
    memoText: {
        fontSize: 16,
        lineHeight: 24,
    }

});

