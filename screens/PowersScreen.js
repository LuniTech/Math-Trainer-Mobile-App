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

export default function PowersScreen({ navigation }) {
  // State variables
  const [base, setBase] = useState(0);
  const [exponent, setExponent] = useState(2);
  const [digits, setDigits] = useState(1);
  const [userAnswer, setUserAnswer] = useState('0');
  const [score, setScore] = useState(0);
  const [totalTally, setTotalTally] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [solutionText, setSolutionText] = useState('');
  const [answerDisabled, setAnswerDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // Calculate range based on digit settings
  const calculateRange = (digits) => {
    let range = 10;
    for (let i = 1; i < digits; i++) {
      range *= 10;
    }
    return range;
  };

  // Generate new power problem
  const generateProblem = () => {
    const range = calculateRange(digits);
    const min = range / 10;
    
    const num = Math.floor(Math.random() * (range - min)) + min;
    
    setBase(num);
    setUserAnswer('0');
    setFeedback('');
    setSolutionText('');
    setAnswerDisabled(false);
    setSubmitDisabled(false);
  };

  // Check user's answer
  const checkAnswer = () => {
    const correctAnswer = Math.pow(base, exponent);
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
    const correctAnswer = Math.pow(base, exponent);
    setSolutionText(`${base}^${exponent} = ${correctAnswer}`);
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
  }, [base, exponent, userAnswer]);

  // Generate initial problem
  useEffect(() => {
    generateProblem();
  }, [digits, exponent]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Arithmetic Trainer: Powers</Text>
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
          
          <View style={styles.powerContainer}>
            <Text style={styles.baseText}>{base}^</Text>
            <Text style={styles.exponentText}>{exponent}</Text>
          </View>
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
          
          <Text style={styles.settingLabel}>Base length (1-5):</Text>
          <TextInput
            style={styles.digitInput}
            value={digits.toString()}
            onChangeText={(text) => {
              const num = parseInt(text);
              if (!isNaN(num) && num >= 1 && num <= 5) {
                setDigits(num);
              } else if (text === "") {
                setDigits(0);
              }
            }}
            keyboardType="numeric"
          />
          
          <Text style={styles.settingLabel}>Power:</Text>
          <Picker
            selectedValue={exponent}
            style={styles.picker}
            onValueChange={(itemValue) => setExponent(itemValue)}>
            <Picker.Item label="Square (²)" value={2} />
            <Picker.Item label="Cube (³)" value={3} />
          </Picker>
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
    minHeight: '70%',
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
  powerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  baseText: {
    fontSize: 24,
    textAlign: 'center',
  },
  exponentText: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 2,
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
  digitInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 15,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
  },
});