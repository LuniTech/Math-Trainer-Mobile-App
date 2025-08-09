import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
  Linking
} from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'ArchivoBlack': require('./assets/fonts/ArchivoBlack-Regular.ttf'),
    'Tektur': require('./assets/fonts/Tektur[wdth,wght].ttf'),
    'JollyLodger': require('./assets/fonts/JollyLodger-Regular.ttf'),
    'GaMaamli': require('./assets/fonts/GaMaamli-Regular.ttf'),
  });

  // State variables
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [digits1, setDigits1] = useState(1);
  const [digits2, setDigits2] = useState(1);
  const [userAnswer, setUserAnswer] = useState('0');
  const [score, setScore] = useState(0);
  const [totalTally, setTotalTally] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [solutionText, setSolutionText] = useState('');
  const [activeTab, setActiveTab] = useState('Addition');
  const [answerDisabled, setAnswerDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // Calculate ranges based on digit settings
  const calculateRange = (digits) => {
    let range = 10;
    for (let i = 1; i < digits; i++) {
      range *= 10;
    }
    return range;
  };

  // Generate new problem
  const generateProblem = () => {
    const range1 = calculateRange(digits1);
    const range2 = calculateRange(digits2);
    
    const min1 = range1 / 10;
    const min2 = range2 / 10;
    
    const num1 = Math.floor(Math.random() * (range1 - min1)) + min1;
    const num2 = Math.floor(Math.random() * (range2 - min2)) + min2;
    
    setNumber1(num1);
    setNumber2(num2);
    setUserAnswer('0');
    setFeedback('');
    setSolutionText('');
    setAnswerDisabled(false);
    setSubmitDisabled(false);
  };

  // Check user's answer
  const checkAnswer = () => {
    const correctAnswer = number1 + number2;
    const userAns = parseInt(userAnswer) || 0;
    
    setAnswerDisabled(true);
    setSubmitDisabled(true);
    
    if (correctAnswer === userAns) {
      setFeedback('✓');
      setScore(prev => prev + 1);
    } else {
      setFeedback('✗');
    }
    
    setTotalTally(prev => prev + 1);
  };

  // Show solution
  const showSolution = () => {
    const correctAnswer = number1 + number2;
    setSolutionText(`${number1} + ${number2} = ${correctAnswer}`);
  };

  // Redo current problem
  const redoProblem = () => {
    setUserAnswer('0');
    setFeedback('');
    setSolutionText('');
    setAnswerDisabled(false);
    setSubmitDisabled(false);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'g' || e.key === 'G') {
        generateProblem();
      } else if (e.key === 'r' || e.key === 'R') {
        redoProblem();
      } else if (e.key === 'a' || e.key === 'A') {
        showSolution();
      } else if (e.key === 'm' || e.key === 'M') {
        checkAnswer();
      }
    };

    if (Platform.OS === 'web') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [number1, number2, userAnswer]);

  // Generate initial problem
  useEffect(() => {
    generateProblem();
  }, [digits1, digits2]);

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Arithmetic Trainer: Addition</Text>
      </View>

      {/* Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
       {/* <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropbtn}>
            <Text style={styles.navText}>Mode∇</Text>
          </TouchableOpacity>
          <View style={styles.dropdownContent}>
            <TouchableOpacity 
              style={[styles.dropdownItem, activeTab === 'Addition' && styles.activeTab]}
              onPress={() => setActiveTab('Addition')}
            >
              <Text style={styles.dropdownText}>Addition</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => setActiveTab('Subtraction')}
            >
              <Text style={styles.dropdownText}>Subtraction</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => setActiveTab('Multiplication')}
            >
              <Text style={styles.dropdownText}>Multiplication</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => setActiveTab('Times Tables')}
            >
              <Text style={styles.dropdownText}>Times Tables</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => setActiveTab('Powers')}
            >
              <Text style={styles.dropdownText}>Powers</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => setActiveTab('Division')}
            >
              <Text style={styles.dropdownText}>Division</Text>
            </TouchableOpacity>
          </View>
        </View>
*/}
        
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>About</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.mathLayout}>
          <Text style={styles.scoreText}>Score: {score}/{totalTally}</Text>
          
          <Text style={styles.numberText}>{number1}</Text>
          <Text style={styles.numberText}>+ {number2}</Text>
          <View style={styles.divider} />
          
          <View style={styles.answerRow}>
            <TextInput
              style={styles.answerInput}
              value={userAnswer}
              onChangeText={setUserAnswer}
              keyboardType="numeric"
              editable={!answerDisabled}
            />
            <Text style={[styles.feedback, feedback === '✓' ? styles.correct : styles.incorrect]}>
              {feedback}
            </Text>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={checkAnswer}
              disabled={submitDisabled}
            >
              <Text style={styles.buttonText}>Mark (M)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={showSolution}>
              <Text style={styles.buttonText}>Show Solution (A)</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={redoProblem}>
              <Text style={styles.buttonText}>Re-do problem (R)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={generateProblem}>
              <Text style={styles.buttonText}>Generate new problem (G)</Text>
            </TouchableOpacity>
          </View>
          
          {solutionText ? (
            <View style={styles.solutionPane}>
              <Text style={styles.solutionTitle}>The solution</Text>
              <Text style={styles.solutionText}>{solutionText}</Text>
            </View>
          ) : null}
        </View>
        
        <View style={styles.settings}>
          <Text style={styles.settingsTitle}>Settings</Text>
          <View style={styles.divider} />
          
          <Text style={styles.settingLabel}>Digit length:</Text>
          
          <View style={styles.settingGroup}>
            <Text style={styles.settingText}>Num 1</Text>
           <TextInput
  style={styles.digitInput}
  value={digits1.toString()}
  onChangeText={(text) => {
    // Only update if the input is a valid number between 1 and 10
    const num = parseInt(text);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      setDigits1(num);
    } else if (text === "") {
      // Allow empty input temporarily
      setDigits1(0); // Or keep it as the previous value
    }
  }}
  keyboardType="numeric"
/>
          </View>
          
          <View style={styles.settingGroup}>
            <Text style={styles.settingText}>Num 2</Text>
          <TextInput
  style={styles.digitInput}
  value={digits2.toString()}
  onChangeText={(text) => {
    const num = parseInt(text);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      setDigits2(num);
    } else if (text === "") {
      setDigits2(0);
    }
  }}
  keyboardType="numeric"
/>
          </View>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Zipho Innocent Lunika © 2025</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'mediumspringgreen',
    padding: 0,
    margin: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Tektur',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nav: {
    backgroundColor: 'gold',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  navButton: {
    padding: 8,
  },
  navText: {
    color: 'white',
    fontFamily: 'ArchivoBlack',
    fontSize: 16,
  },
  dropdown: {
    position: 'relative',
  },
  dropbtn: {
    backgroundColor: 'gold',
    padding: 8,
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'gold',
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    color: 'white',
    fontFamily: 'ArchivoBlack',
  },
  activeTab: {
    backgroundColor: '#006400',
  },
  mainContent: {
    flexDirection: 'row',
    padding: 5,
    minHeight: '75%',
  },
  mathLayout: {
    width: '70%',
    paddingHorizontal: 10,
  },
  settings: {
    width: '30%',
    paddingHorizontal: 10,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'ArchivoBlack',
  },
  numberText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: 'ArchivoBlack',
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  answerInput: {
    width: '60%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    marginRight: 10,
  },
  feedback: {
    fontSize: 24,
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'ArchivoBlack',
  },
  solutionPane: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  solutionText: {
    fontSize: 16,
  },
  settingsTitle: {
    fontSize: 18,
    fontFamily: 'ArchivoBlack',
    marginBottom: 5,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  settingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingText: {
    width: '50%',
    fontFamily: 'ArchivoBlack',
  },
  digitInput: {
    width: '50%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontFamily: 'JollyLodger',
  },
});