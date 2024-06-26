import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Routing from './navigation/Index';

export default function App() {
  return (
    <NavigationContainer>
      <Routing />
    </NavigationContainer>
  );
}
