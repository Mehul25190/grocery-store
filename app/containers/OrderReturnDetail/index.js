import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, TextInput, ScrollView, FlatList } from 'react-native';
import _ from 'lodash';
import { Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right, Card, Grid, Col, Row, ListItem, Item, Input, label, Picker
} from 'native-base';
import url from "../../config/api";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { ReturnReason } from '../data/data';


class OrderReturnDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //default value of the date time
      date: '',
      time: '',
      selected: 'key0'
    };

  }
  componentDidMount() {
    var that = this;
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date().getDate(); //Current Date
    var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    that.setState({
      //Setting the value of the date time
      date: date + ' ' + month + ' ' + year,
      time: hours + ':' + min
    });
  }
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

  dateFormate(date) {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let orderDate = new Date(date);
    let getDate = orderDate.getDate() + " " + monthNames[orderDate.getMonth()] + " " + orderDate.getFullYear();
    return getDate;
  }
  onValueChange(value: string) {
    this.setState({
      selected: value,
      switch1Value: value
    });
  }
  /* onPressSubmit = (item) => {
      this.props.navigation.navigate('Confirmation', { item });
    }; */


  renderItems = ({ item, index }) => (
    <ListItem style={styles.ListItems} noBorder>
      <Left style={styles.ListLeft}>
        <Image style={styles.proImage} source={{ uri: url.imageURL + item.imagePath }} />
        <Text style={styles.proPrice}>{'\u20B9'} {item.itemPrice}</Text>
      </Left>

      <Body style={styles.bodyText}>
        <Text style={[styles.proTitle, { fontFamily: 'Font-Medium' }]}>{item.itemName} </Text>
        <Text style={styles.QtyPro}>Qty: {item.quantity}</Text>
      </Body>

      <Right style={styles.ListRight}>
        <View style={styles.RigView}>
          <Icon name='camera' type='FontAwesome' style={styles.camera} />
        </View>
        <View style={[styles.RigView, styles.qtyCol]}>
          <Text style={styles.qtyText}>Qty</Text>
          <TextInput style={styles.qtyInput}
            keyboardType='numeric'
            maxLength={2} value={10} />
        </View>

        <Button style={styles.RigView} style={styles.returnBtn}>
          <TouchableOpacity >
            <Text style={styles.btnText}> Return </Text>
          </TouchableOpacity>
        </Button>
      </Right>
    </ListItem>
  );

  render() {
    const { navigation } = this.props;
    const orderData = navigation.getParam('orderData');
    const getItem = navigation.getParam('orderItem');

    return (
      <Container style={appStyles.container}>

        <Headers
          IconLeft='arrowleft'
          onPress={() => this.openControlPanel()}
          IconRightF='search'
          setCart={true}
          bgColor='transparent'
          Title='Return Order Details'
        />


        <ScrollView>
          <Card style={[appStyles.addBox, { height: 'auto' }, styles.orderBox]}>
            <Grid >
              <Row style={styles.orderRow}>
                <Col style={styles.orderTitle}>
                  <Text style={styles.orderTitleText}>Order Date</Text>
                </Col>
                <Col style={styles.orderValue}>
                  <Text style={styles.orderValText}>{(orderData.length > 0) ? orderData[0].orderDate : ""}</Text>
                </Col>
              </Row>
              <Row style={styles.orderRow}>
                <Col style={styles.orderTitle}>
                  <Text style={styles.orderTitleText}>Order#</Text>
                </Col>
                <Col style={styles.orderValue}>
                  <Text style={styles.orderValText}>{(orderData.length > 0) ? orderData[0].orderNumber : ""}</Text>
                </Col>
              </Row>
              <Row style={styles.orderRow}>
                <Col style={styles.orderTitle}>
                  <Text style={styles.orderTitleText}>Order Total</Text>
                </Col>
                <Col style={styles.orderValue}>
                  <Text style={styles.orderValText}>
                    <Text style={{ fontFamily: 'Roboto', color: 'gray' }}>{'\u20B9'}
                    </Text>{(orderData.length > 0) ? orderData[0].orderAmt : ""}</Text>
                </Col>
              </Row>
            </Grid>

            <View style={{ merginRight: Layout.indent, justifyContent: 'center' }}>
              <Text style={styles.title}>Select Reason to Return Order</Text>
              <View style={styles.reasonView} >
                <Item style={{ borderBottomWidth: 0 }} >
                  <Picker
                    note
                    mode="dropdown"
                    style={styles.dorpDownReason}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                    placeholderStyle={{ borderWidth: 10 }}
                    placeholderIconColor={{ borderWidth: 2 }}
                  >
                    {/* <Picker.Item label="Select Reason to Return Order" value="0" /> */}
                    {

                      ReturnReason.map(data => (
                        <Picker.Item key={data.key} label={data.reason} value={data.key} />

                      ))

                    }


                  </Picker>
                  <Image source={imgs.DownArrow} style={styles.DownArrow} />
                </Item>
              </View>
            </View>

            <ScrollView>
              <FlatList

                initialScrollIndex={this.currentIndex}
                showsHorizontalScrollIndicator={false}
                data={getItem}
                renderItem={this.renderItems}
                keyExtractor={(item) => `${item.itemName}`}
              />
            </ScrollView>




          </Card>

        </ScrollView>
        <View style={styles.doneBtnArea}>
          <Button priamary full style={styles.doneBtn}>
            <TouchableOpacity onPress={() => this.onPressSubmit()}>
              <Text style={styles.btnTextDone}>Done</Text>
            </TouchableOpacity>
          </Button>
        </View>







      </Container>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(OrderReturnDetail);