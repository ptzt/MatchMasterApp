import React from 'react';
import { Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

const Card = ({ onPress, isTurnedOver, children, isMatched }) => {
    const windowWidth = useWindowDimensions().width;
    const cardSize = windowWidth * 0.2; // Ajusta el tamaño de la carta en función del ancho de la pantalla

    const handlePress = () => {
        if (!isMatched) {
            onPress();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.card, { width: cardSize, height: cardSize }, isTurnedOver && styles.cardUp]}>
            {isTurnedOver ? (
                <Text style={styles.text}>{children}</Text>
            ) : (
                <Text style={styles.text}>?</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 5,
        borderWidth: 2,
        borderColor: '#334155',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e293b',
    },
    cardUp: {
        borderWidth: 10,
        borderColor: '#334155',
        borderRadius: 25,
    },
    text: {
        fontSize: 30, // Reducir el tamaño de la fuente para que quepa en la carta más pequeña
        color: '#334155',
    },
});

export default Card;
