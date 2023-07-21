import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

const cards = ["😀", "🚀", "🎉", "🍕", "🌈", "🐼"];


export default function App() {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]))
  const [selectedCard, setSelectedCard] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)

  const HandleTabCard = (index) => {

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>MatchMaster</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          return <Card
            key={index}
          // isTurnedOver={isTurnedOver}
          // onPress={() => HandleTabCard(index)}
          >{card}</Card>
        })}
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 900
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array
}