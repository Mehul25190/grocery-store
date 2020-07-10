import React from "react";
import { Image, View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import { Screens, Layout, Colors } from '../constants';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right, Card, Grid, Col, Row, ListItem
} from 'native-base';
import styles from '../containers/MyAddress/styles';

import appStyles from '../theme/appStyles';
import * as userActions from "../actions/user";
import imgs from '../assets/images';

class DeliveryAddress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  editAddress = () => {
    //this.props.navigation.navigate('MyAddress');
    this.props.navigation.navigate(Screens.MyAddress.route);
  }

  render() {
    const { navigation, deliveryAddress } = this.props;
    return (
      <View>
        
          <Text style={appStyles.deliveryAddressTitle}>Delivery Address </Text>
       
      <Card style={[appStyles.addBox, appStyles.deliveryAddress]}>
        

        <ListItem noBorder icon style={{ marginLeft: Layout.indent, }}>

          <Left >
            <Icon name="location-on" type="MaterialIcons" 
              style={[appStyles.IconStyle, styles.addressIcon]}
            />
          </Left>

          <Body>
            <Text style={[appStyles.userArea,styles.addressText]} >
              {(deliveryAddress ? (deliveryAddress.aptNo + ",") : "" )} {(deliveryAddress ? (deliveryAddress.buildingName + ",") : "")} 
            </Text>
            <Text style={[appStyles.userCity, styles.addressText]} >{deliveryAddress ? deliveryAddress.cityName + ' - ' + deliveryAddress.state : ''} </Text>
          </Body>

          <Right>
            <TouchableOpacity onPress={() => this.props.redirectToDeliveryAddress()}>
              <Icon name="edit" type="MaterialIcons"
                style={[appStyles.IconStyle, styles.addressIcon]}
              />
            </TouchableOpacity>
          </Right>

        </ListItem>
      </Card>
      </View>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
    user: state.auth.user,
    deliveryAddress: state.subscription.deviveryAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToDeliveryAddress: () => dispatch(NavigationActions.navigate({ routeName: Screens.MyAddress.route })),
    //showDeliveryAddress: (userid) => dispatch(userActions.getDeviveryAddress({userId:userid})),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);