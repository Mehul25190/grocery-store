// Imports: Dependencies
import React from 'react';
import { View, Text, Image } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

/*import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';*/
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';

import { StyleProvider, Root } from 'native-base';
import getTheme from './app/theme/components';
import material from './app/theme/variables/material';

// Imports: Navigation
import ReduxNavigation from './app/navigation/ReduxNavigation';

// Imports: Redux Persist Persister
import { store, persistor } from './app/store/store';


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

// React Native: App
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isReady: false,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      // 'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      ...Ionicons.font,
      ...FontAwesome.font,
      ...AntDesign.font,
      'Font-Light': require('./app/assets/fonts/Montserrat-Light.ttf'),
      'Font-Regular': require('./app/assets/fonts/Poppins-Regular.ttf'),
      'Font-Medium': require('./app/assets/fonts/Poppins-Medium.ttf'),
      
      'Font-Bold': require('./app/assets/fonts/Poppins-Bold.ttf'),
      'Raleway-Black': require('./app/assets/fonts/Raleway-Black.ttf'),
      'Raleway-Bold': require('./app/assets/fonts/Raleway-Bold.ttf'),
      'Raleway-Regular': require('./app/assets/fonts/Raleway-Regular.ttf'),
      'Raleway-Medium': require('./app/assets/fonts/Raleway-Medium.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading />
      );
    }
    return (
      // Redux: Global Store
      <Provider store={store}>
        <PersistGate 
          loading={<AppLoading />}
          persistor={persistor}
        >
          <StyleProvider style={getTheme(material)}>
            <Root>
              <ReduxNavigation />
            </Root>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
};