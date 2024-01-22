import * as React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
    placeholder: string,
    label: string,
    onChange: Function
}

export default (props: Props) => {
    return (
        <View>
            <Text>{props.label}</Text>
            <TextInput placeholder={props.placeholder} style={styles.input} onChangeText={(value) => props.onChange(value)} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      marginTop: 12,
      marginBottom: 12,
      borderWidth: 1,
      padding: 10,
    }
});