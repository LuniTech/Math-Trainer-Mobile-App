import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; 
import AdditionScreen from './screens/AdditionScreen';
import SubtractionScreen from './screens/SubtractionScreen';
import MultiplicationScreen from './screens/MultiplicationScreen';
import TimesTablesScreen from './screens/TimesTablesScreen';
import DivisionScreen from './screens/DivisionScreen';
import PowersScreen from './screens/PowersScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Addition" component={AdditionScreen} />
<Stack.Screen name="Subtraction" component={SubtractionScreen} />
      

<Stack.Screen name="Multiplication" component={MultiplicationScreen} />
<Stack.Screen name="TimesTables" component={TimesTablesScreen} />
<Stack.Screen name="Division" component={DivisionScreen} />
<Stack.Screen name="Powers" component={PowersScreen} />
<Stack.Screen name="About" component={AboutScreen} />
<Stack.Screen name="Contact" component={ContactScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
