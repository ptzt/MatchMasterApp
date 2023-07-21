import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

const cards = ["😀", "🚀", "🎉", "🍕", "🌈", "🐼"];


export default function App() {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]))
  const [selectedCards, setSelectedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (selectedCards.length < 2) return
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...setSelectedCards])
      setSelectedCards([])
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [selectedCards])

  const HandleTabCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return
    setSelectedCards([...selectedCards, index])
    setScore(score + 1)
  }

  const didPlayerWin = () => matchedCards.length === board.length



  return (
    <View style={styles.container}>
      <Text style={styles.title}>{didPlayerWin() ? 'Congratulations 🎉' : 'MatchMaster'}</Text>
      <Text style={styles.title}>Movements: {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver = selectedCards.includes(index) || matchedCards.includes(index)
          return <Card
            key={index}
            isTurnedOver={isTurnedOver}
            onPress={() => HandleTabCard(index)}
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