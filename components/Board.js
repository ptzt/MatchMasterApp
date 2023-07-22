import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';

const Board = ({ board, selectedCards, matchedCards, HandleTabCard }) => {
    return (
        <View style={styles.board}>
            {board.map((card, index) => {
                const isTurnedOver = selectedCards.includes(index) || matchedCards.includes(index)
                const isMatched = matchedCards.includes(index)
                return <Card
                    key={index}
                    isTurnedOver={isTurnedOver}
                    onPress={() => HandleTabCard(index)}
                    isMatched={isMatched}
                >{card}</Card>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
});

export default Board;
