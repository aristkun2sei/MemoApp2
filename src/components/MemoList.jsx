import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MemoList(){
    const navigation = useNavigation();//NavigationをScreenで定義していなくても使えるようにする。
    return(
        <View>
            <TouchableOpacity
                style={styles.memoListItem}
                onPress = {() => {navigation.navigate('MemoDetail'); }}
            >
                <View>
                    <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemDate}>2020年12月24日 10:00</Text>
                </View>
                <TouchableOpacity style= {styles.memoDelete} onPress={() => { Alert.alert('Are you sure?'); }}>
                    <Feather name = 'x' size = {16} color = '#b0b0b0' />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.memoListItem}
                onPress = {() => {navigation.navigate('MemoDetail'); }}
            >
                <View>
                    <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemDate}>2020年12月24日 10:00</Text>
                </View>
                <TouchableOpacity style= {styles.memoDelete} onPress={() => { Alert.alert('Are you sure?'); }}>
                    <Feather name = 'x' size = {16} color = '#b0b0b0' />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.memoListItem}
                onPress = {() => {navigation.navigate('MemoDetail'); }}
            >
                <View>
                    <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemDate}>2020年12月24日 10:00</Text>
                </View>
                <TouchableOpacity style= {styles.memoDelete} onPress={() => { Alert.alert('Are you sure?'); }}>
                    <Feather name = 'x' size = {16} color = '#b0b0b0' />
                </TouchableOpacity>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
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
    memoListitemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
    },
    memoDelete: {
        padding: 8,
    }

});
