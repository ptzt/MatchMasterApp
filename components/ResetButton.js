import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ResetButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.resetContainer}>
            <Text style={styles.reset}>reset</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    resetContainer: {
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 20
    },
    reset: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default ResetButton;