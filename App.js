import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, BackHandler } from 'react-native';
import { EmojiRain } from 'react-native-emoji-rain'
import { Vibration } from 'react-native';
import { Audio } from 'expo-av';

import ResetButton from './components/ResetButton';
import SplashScreen from './components/SplashScreen';
import Board from './components/Board';
import Menu from './components/Menu';

const cards = ["😀", "🚀", "🎉", "🍕", "🌈", "🐼"];


export default function App() {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]))
  const [selectedCards, setSelectedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState()
  const [winSound, setWinSound] = useState()
  const [isPlayerWin, setIsPlayerWin] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false); // Estado para controlar si el juego ha comenzado
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar la visualización del modal de confirmación

  // Sonidos
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/sounds/pop2.mp3'));
    setSound(sound);

    await sound.playAsync();
  }

  async function playSound2() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/sounds/win.mp3'));
    setWinSound(sound); // Aquí también, cambia "winSound" por "sound"

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {
    return winSound
      ? () => {
        winSound.unloadAsync();
      }
      : undefined;
  }, [winSound]);


  // Función para entrar a las opciones
  const toggleSound = () => {
    Alert.alert('Enter options')
  };

  const handleExit = () => {
    setMatchedCards([])
    setScore(0)
    setSelectedCards([])
    setBoard(shuffle([...cards, ...cards]));
    setIsGameStarted(false); // Cambia el estado para indicar que el juego ha terminado y se debe volver al menú y se reinicia el board al salir al menu
  };


  // Función para salir de la app
  const handleExitApp = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    // Agregar el listener del evento cuando el componente se monta
    BackHandler.addEventListener('hardwareBackPress', handleExitApp);

    // Remover el listener del evento cuando el componente se desmonta
    return () => BackHandler.removeEventListener('hardwareBackPress', handleExitApp);
  }, []);

  // Función para iniciar el juego
  const handlePlay = () => {
    // Coloca aquí cualquier lógica para iniciar el juego
    console.log('Starting the game');
    setIsGameStarted(true);
  };



  // Logica del juego
  useEffect(() => {
    if (selectedCards.length < 2) return
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards])
      setSelectedCards([])
      playSound()

    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [selectedCards])

  const HandleTabCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return
    setSelectedCards([...selectedCards, index])
    setScore(score + 1)
    if (selectedCards.length === 1) {
    }
    //Vibracion cuando se toca una tab
    Vibration.vibrate(150)
  }

  //Comprobacion de si el jugador gano
  const didPlayerWin = () => matchedCards.length === board.length

  useEffect(() => {
    if (matchedCards.length === board.length) {
      setIsPlayerWin(true);
      playSound2(); // Llama al sonido de victoria cuando el jugador gane
    }
  }, [matchedCards]);


  //onPress del reset
  const resetGame = () => {
    setMatchedCards([])
    setScore(0)
    setSelectedCards([])
    setBoard(shuffle([...cards, ...cards]));

    Vibration.vibrate(150)
  }

  const handleExitConfirmation = () => {
    setShowConfirmation(true);
  };

  // Función para cancelar la salida (cerrar el modal)
  const handleCancelExit = () => {
    setShowConfirmation(false);
  };

  // Función para confirmar la salida
  const handleConfirmExit = () => {
    handleCancelExit(); // Cierra el modal antes de salir de la app
    handleExit(); // Sale de la app
  };

  //Simula pantalla de carga
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Puedes ajustar el tiempo de carga aquí (3 segundos en este ejemplo)
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Si isLoading es true, muestra la pantalla de carga
  }





  return (
    <View style={styles.container}>

      {isGameStarted && (
        <TouchableOpacity onPress={handleExitConfirmation} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>X</Text>
        </TouchableOpacity>
      )}


      {isGameStarted ? (
        <View style={styles.container}>
          {didPlayerWin() && <EmojiRain emoji="🎉" count={50} />}
          <Text style={styles.title}>{didPlayerWin() ? 'Congratulations 🎉' : ''}</Text>
          <Text style={styles.subtitle}>Movements: {score}</Text>
          <Board
            key={isGameStarted}
            board={board}
            selectedCards={selectedCards}
            matchedCards={matchedCards}
            HandleTabCard={HandleTabCard}
          />
          {didPlayerWin() && <ResetButton onPress={resetGame} />}
          <StatusBar style="light" />
        </View>
      ) : (
        <Menu
          onStartGame={handlePlay}
          onToggleSound={toggleSound}
          onExit={handleExitApp}
        />
      )}

      {/* Modal de confirmacion proximo a modularizar*/}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Seguro que deseas volver al menú?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity onPress={handleCancelExit} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmExit} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  exitButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    zIndex: 1,
    backgroundColor: '#FF0000',
    width: 50,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#009688',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
}
