import React from "react";
import { Text, Image } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import SvgIcon from 'react-native-svg-icon';
import { Icon } from 'native-base';
import appStyles from '../theme/appStyles';
import svgs from '../assets/svgs';
import { Colors, Layout } from '../constants';

class Svgicon extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <Icon style={[appStyles.IconStyle, this.props.IconStyle,{color: this.props.color}]}  
          width={this.props.width || Layout.iconSize}
          height={this.props.height || Layout.iconSize}
          type={this.props.type}
          name={this.props.name}
          
        />
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Svgicon);