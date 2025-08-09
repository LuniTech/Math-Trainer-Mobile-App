import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image,
  Linking
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lunika Arithmetic Trainer</Text>

      <View style={styles.mainContent}>
        <ScrollView style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Addition')}
          >
            <Text style={styles.buttonText}>Addition</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Subtraction')}
          >
            <Text style={styles.buttonText}>Subtraction</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Multiplication')}
          >
            <Text style={styles.buttonText}>Multiplication</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('TimesTables')}
          >
            <Text style={styles.buttonText}>Basic Times Tables</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Division')}
          >
            <Text style={styles.buttonText}>Division</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Powers')}
          >
            <Text style={styles.buttonText}>Powers</Text>
          </TouchableOpacity>
        </ScrollView>

        {/*<View style={styles.imageContainer}>
          <Image
            source={require('./assets/CoverImages/image1.jpg')}
            style={styles.webImage}
            resizeMode="cover"
          />
        </View>*/}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made using React Native
          {'\n'}
          <Text 
            style={styles.link} 
            onPress={() => navigation.navigate('About')}
          >
            About
          </Text>{' '}
          <Text 
            style={styles.link} 
            onPress={() => navigation.navigate('Contact')}
          >
            Contact
          </Text>
          {'\n'}
          &copy; 2025 Zipho Innocent Lunika
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAD2',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Tektur',
    marginVertical: 10,
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '56%',
    marginHorizontal: 3,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 3,
  },
  webImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  footer: {
    padding: 10,
 paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});