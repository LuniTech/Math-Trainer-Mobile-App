import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function TimesTablesScreen({ navigation }) {
  // State variables
  const [number1, setNumber1] = useState(4); // Default to 4 times table
  const [number2, setNumber2] = useState(1);
  const [timesTable, setTimesTable] = useState(4);
  const [range, setRange] = useState(4);
  const [randomMode, setRandomMode] = useState(true);
  const [counter, setCounter] = useState(1);
  const [userAnswer, setUserAnswer] = useState('0');
  const [score, setScore] = useState(0);
  const [totalTally, setTotalTally] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [solutionText, setSolutionText] = useState('');
  const [answerDisabled, setAnswerDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // Generate new times table problem
  const generateProblem = () => {
    let newNumber2;
    
    if (randomMode) {
      newNumber2 = Math.floor(Math.random() * range) + 1;
      setCounter(newNumber2);
    } else {
      newNumber2 = counter;
      if (counter === 0) {
        newNumber2 = 1;
      }
    }

    setNumber1(timesTable);
    setNumber2(newNumber2);
    setUserAnswer('0');
    setFeedback('');
    setSolutionText('');
    setAnswerDisabled(false);
    setSubmitDisabled(false);

    // Update counter for sequential mode
    let nextCounter = counter + 1;
    if (randomMode && nextCounter > range) {
      nextCounter = 1;
    } else if (!randomMode && nextCounter > 15) {
      nextCounter = 1;
    }
    setCounter(nextCounter);
  };

  // Check user's answer
  const checkAnswer = () => {
    const correctAnswer = number1 * number2;
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
    const correctAnswer = number1 * number2;
    setSolutionText(`${number1} × ${number2} = ${correctAnswer}`);
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
  }, [number1, number2, userAnswer, counter, randomMode, timesTable, range]);

  // Generate initial problem
  useEffect(() => {
    generateProblem();
  }, [timesTable, range, randomMode]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Arithmetic Trainer: Times Tables</Text>
      </View>

      {/* Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('About')}>
          <Text style={styles.navText}>About</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.navText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.mathLayout}>
          <Text style={styles.scoreText}>Score: {score}/{totalTally}</Text>
          
          <Text style={styles.numberText}>{number1}</Text>
          <Text style={styles.numberText}>× {number2}</Text>
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
              onPress={generateProblem}
            >
              <Text style={styles.buttonText}>Generate Next (G)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={checkAnswer}
              disabled={submitDisabled}
            >
              <Text style={styles.buttonText}>Mark (M)</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={showSolution}>
              <Text style={styles.buttonText}>Show Solution (A)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={redoProblem}>
              <Text style={styles.buttonText}>Re-do problem (R)</Text>
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
          
          <Text style={styles.settingLabel}>Choose a Times Table:</Text>
          <Picker
            selectedValue={timesTable}
            style={styles.picker}
            onValueChange={(itemValue) => setTimesTable(itemValue)}>
            {[...Array(15).keys()].map(i => (
              <Picker.Item key={i+1} label={`${i+1} Times Table`} value={i+1} />
            ))}
          </Picker>
          
          <Text style={styles.settingLabel}>Up to:</Text>
          <Picker
            selectedValue={range}
            style={styles.picker}
            onValueChange={(itemValue) => setRange(itemValue)}>
            {[...Array(15).keys()].map(i => (
              <Picker.Item key={i+1} label={`${i+1}`} value={i+1} />
            ))}
          </Picker>
          
          <View style={styles.checkboxContainer}>
            <Text style={styles.settingLabel}>Random:</Text>
            <TouchableOpacity
              style={[styles.checkbox, randomMode && styles.checkboxChecked]}
              onPress={() => setRandomMode(!randomMode)}>
              {randomMode && <Text style={styles.checkboxText}>✓</Text>}
            </TouchableOpacity>
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
  header: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
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
    fontSize: 16,
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
  },
  numberText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 5,
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
    marginBottom: 5,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkboxChecked: {
    backgroundColor: '#1E90FF',
  },
  checkboxText: {
    color: 'white',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
  },
});