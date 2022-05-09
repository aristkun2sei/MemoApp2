import React from 'react';
import {
    View, Text, StyleSheet, TextInput,
}from 'react-native';
import KeyboardSafeView from '../components/KeyboardSafeView';
import CircleButton from '../components/CircleButton';

export default function MemoEditScreen(props){
    const { navigation } = props;
    return(
        <KeyboardSafeView style={styles.container} behavior = 'height' >
            <View style={styles.inputContainer}>
                <TextInput  value = '買い物リスト' multiline style={styles.input} />
            </View>
            <CircleButton name='check'
            onPress={() => { navigation.goBack(); }}
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
