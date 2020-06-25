import React from "react";
import { ImageBackground, View, Modal, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import {
  Container,
  Content,
  Icon,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Spinner, Row, Col
} from 'native-base';   

import appStyles from '../theme/appStyles';
import imgs from '../assets/images';
import { Layout, Colors } from '../constants';
import Logo from './Logo';

class Loader extends React.Component {
  render() {
    return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.props.loading}
          onRequestClose={() => {console.log('close modal')}}>
          <View style={appStyles.modalBackground}>
            <View style={appStyles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={this.props.loading} />
            </View>
          </View>
        </Modal> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Loader);