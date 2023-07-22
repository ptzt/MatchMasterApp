import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
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
      setMatchedCards([...matchedCards, ...selectedCards])
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

  const resetGame = () => {
    setMatchedCards([])
    setScore(0)
    setSelectedCards([])
    setBoard(shuffle([...cards, ...cards]));
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{didPlayerWin() ? 'Congratulations 🎉' : 'MatchMaster'}</Text>
      <Text style={styles.title}>Movements: {score}</Text>
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
      {didPlayerWin() && <Button title="reset" onPress={resetGame} />}
      {/* <Button title="reset" onPress={resetGame} /> */}
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
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
}
