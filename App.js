import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { EmojiRain } from 'react-native-emoji-rain'
import Card from './components/Card';
import SplashScreen from './components/SplashScreen';


const cards = ["😀", "🚀", "🎉", "🍕", "🌈", "🐼"];


export default function App() {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]))
  const [selectedCards, setSelectedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // Simula un tiempo de carga para la pantalla de carga
    setTimeout(() => {
      setIsLoading(false); // Cuando termina el tiempo de carga, establece isLoading en false
    }, 3000); // Puedes ajustar el tiempo de carga aquí (3 segundos en este ejemplo)
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Si isLoading es true, muestra la pantalla de carga
  }


  return (
    <View style={styles.container}>
      {didPlayerWin() && <EmojiRain emoji="🎉" count={50} />}
      <Text style={styles.title}>{didPlayerWin() ? 'Congratulations 🎉' : 'MatchMaster'}</Text>
      <Text style={styles.subtitle}>Movements: {score}</Text>
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
      {didPlayerWin() && <TouchableOpacity title="reset" style={styles.reset} onPress={resetGame} />}
      <TouchableOpacity onPress={resetGame} style={styles.resetContainer} ><Text style={styles.reset}>reset</Text></TouchableOpacity>
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
  subtitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 900
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
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

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
}
