import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider} from 'react-redux';

import TabNavigation from './src/navigations/TabNavigation';
import {store} from './src/redux/store';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={customTheme}>
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}
