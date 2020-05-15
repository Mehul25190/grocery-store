import React from "react";
import {
  Icon,
  Text,
  Button,
} from 'native-base';
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {TouchableOpacity} from 'react-native';
import appStyles from '../theme/appStyles';

class LoginBackIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      
      <Button transparent full style={appStyles.loginBack}  >
        <TouchableOpacity  onPress={() => this.props.goBack()}>
          <Icon name="arrow-back" style={appStyles.loginBackIcon} />
         </TouchableOpacity>
      </Button> 
          
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      goBack: () => dispatch(NavigationActions.back()),
   };
};

// Exports
export default connect(null, mapDispatchToProps)(LoginBackIcon);