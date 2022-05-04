import React from 'react';
import {
    View, Text, StyleSheet, TextInput, KeyboardAvoidingView,
}from 'react-native';

import CircleButton from '../components/CircleButton';

export default function MemoCreateScreen(props){
    const { navigation } = props;
    return(
        <KeyboardAvoidingView style={styles.container} behavior = 'height' >
            <View style={styles.inputContainer}>
                <TextInput  value = '' multiline style={styles.input} />
            </View>
            <CircleButton
                name='check'
                onPress = {() => { navigation.goBack(); }}
            />
        </KeyboardAvoidingView>
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
