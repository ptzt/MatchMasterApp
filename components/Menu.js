import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Menu = ({ onStartGame, onToggleSound, onExit }) => {
    return (
        <View style={styles.menuContainer}>
            <Text style={styles.title}>Match Masters</Text>
            <TouchableOpacity onPress={onStartGame} style={styles.button}><Text style={styles.text}>Jugar</Text></TouchableOpacity>
            <TouchableOpacity onPress={onToggleSound} style={styles.button}><Text style={styles.text}>Opciones</Text></TouchableOpacity>
            <TouchableOpacity onPress={onExit} style={styles.button}><Text style={styles.text}>Salir</Text></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10, // Agregar padding para dar espacio entre el borde y el texto
        borderWidth: 10,
        borderColor: '#334155',
        borderRadius: 25,
        marginBottom: 10, // Agregar margen inferior para separar los botones
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: '900',
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20
    }
});

export default Menu;
