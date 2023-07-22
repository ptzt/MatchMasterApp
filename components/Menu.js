import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const Menu = ({ onStartGame, onToggleSound, onExit }) => {
    return (
        <View style={styles.menuContainer}>
            <Button title="Start Game" onPress={onStartGame} />
            <Button title="Options" onPress={onToggleSound} />
            <Button title="Exit" onPress={onExit} />
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Menu;
