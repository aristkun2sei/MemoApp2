import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert, FlatList, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { shape, string, instanceOf, arrayOf } from 'prop-types';

export default function MemoList(props){
    const { memos } = props;
    const navigation = useNavigation();//NavigationをScreenで定義していなくても使えるようにする。

    function renderItem({ item }){ //オブジェクトで渡せるけど、itemしか使わないから。
       return(
            <TouchableOpacity
                style={styles.memoListItem}
                onPress = {() => {navigation.navigate('MemoDetail'); }}
            >
                <View>
                    <Text style={styles.memoListItemTitle} numberOfLines={1} >{item.bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{String(item.updatedAt)}</Text>
                </View>
                <TouchableOpacity style= {styles.memoDelete} onPress={() => { Alert.alert('Are you sure?'); }}>
                    <Feather name = 'x' size = {24} color = '#b0b0b0' />
                </TouchableOpacity>
            </TouchableOpacity>
       );
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={memos}
                renderItem = {renderItem} //関数、オブジェクトは{}で定義。
                keyExtractor = {(item) => item.id }
            />
        </View>
    );
}

MemoList.propTypes = {
    memos: arrayOf(shape({ //memosにはオブジェクトの配列が入ってくるので、配列で渡すようにarrayOFを使う。
        id: string,
        bodyText: string,
        updatedAt: instanceOf(Date),
    })).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    memoListItem: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
        borderBottomWidth: 1,//bottomwidthとすることで、下方向だけに線ができる。
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
    },
    memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
    },
    memoDelete: {
        padding: 8,
    }

});
