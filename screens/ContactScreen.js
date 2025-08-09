import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ContactScreen() {
  const currentYear = new Date().getFullYear();

  const contactMethods = [
    {
      icon: 'envelope',
      title: 'Email',
      description: 'Send me a direct email for professional inquiries',
      actionText: 'Send Email',
      onPress: () => Linking.openURL('mailto:kaluin2@tutamail.com')
    },
    {
      icon: 'telegram',
      title: 'Telegram',
      description: 'Message me on Telegram for quick chats',
      actionText: 'Message Me',
      onPress: () => Linking.openURL('https://t.me/ZIL327')
    },
    {
      icon: 'laptop-code',
      title: 'Experimental Portfolio',
      description: 'Check out my early experimental work',
      actionText: 'Visit Site',
      onPress: () => Linking.openURL('http://innocentlunitech.click/')
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contactHeader}>
        <Text style={styles.headerText}>Get In Touch</Text>
        <Text style={styles.subHeaderText}>Let's connect and collaborate on exciting projects!</Text>
      </View>

      <View style={styles.contactGrid}>
        {contactMethods.map((method, index) => (
          <View key={index} style={styles.contactCard}>
            <Icon name={method.icon} style={styles.contactIcon} />
            <Text style={styles.cardTitle}>{method.title}</Text>
            <Text style={styles.cardDescription}>{method.description}</Text>
            <TouchableOpacity 
              style={styles.contactButton} 
              onPress={method.onPress}
            >
              <Text style={styles.buttonText}>{method.actionText}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          &copy; {currentYear} Zipho Innocent Lunika. All Rights Reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'turquoise',
    padding: 20,
  },
  contactHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontFamily: 'CarterOne-Regular',
    fontSize: 36,
    color: '#333',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  subHeaderText: {
    fontSize: 20,
    color: '#333',
    opacity: 0.8,
  },
  contactGrid: {
    flexDirection: windowWidth > 768 ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 25,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    alignItems: 'center',
    flex: windowWidth > 768 ? 1 : 0,
    minWidth: windowWidth > 768 ? '30%' : '100%',
    marginBottom: windowWidth > 768 ? 0 : 20,
  },
  contactIcon: {
    fontSize: 40,
    color: '#0066ff',
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'PermanentMarker-Regular',
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  contactButton: {
    backgroundColor: '#0066ff',
    padding: 10,
    borderRadius: 5,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 50,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
});