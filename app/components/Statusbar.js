import React from "react";
import { View,StatusBar } from 'react-native';

import appStyles from '../theme/appStyles';

export default class Statusbar extends React.Component {
  render() {
    return (
      <View style={appStyles.statusBar} />
    
    );
  }
}
