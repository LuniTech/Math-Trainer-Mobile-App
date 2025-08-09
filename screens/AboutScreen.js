import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function AboutScreen() {
  const openPaypal = () => {
    Linking.openURL('https://www.paypal.com/paypalme/ZiphoLunika');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About the Developer</Text>
      
      <View style={styles.content}>
        <Text style={styles.text}>
          Hi, my name is Zipho Innocent Lunika. I'm a solo developer who created this app.
        </Text>
        
        <Text style={styles.text}>
          I'm not a large company with a team of developers - just one person passionate about creating useful tools.
        </Text>
        
        <Text style={[styles.text, styles.noAds]}>
          This app has no ads and no tracking!
        </Text>
        
        <Text style={styles.text}>
          If you find this app helpful, please consider supporting my work:
        </Text>
        
        <TouchableOpacity 
          style={styles.donateButton}
          onPress={openPaypal}
        >
          <Text style={styles.buttonText}>Support via PayPal</Text>
        </TouchableOpacity>
        
        <Text style={styles.thankYou}>
          Thank you for using my app!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
  },
  noAds: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 17,
  },
  donateButton: {
    backgroundColor: '#0070ba',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  thankYou: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    color: '#555',
  },
});