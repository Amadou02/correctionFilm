import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import TabNavigation from './src/navigations/TabNavigation';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={customTheme}>
      <TabNavigation />
    </NavigationContainer>
  );
}
