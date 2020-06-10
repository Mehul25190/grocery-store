import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date,TextInput,ScrollView} from 'react-native';
import _ from 'lodash'; 
import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,List,Radio
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as subscriptionAction from "../../actions/subscription";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { showToast } from '../../utils/common';
import { CancelReason } from '../data/data';
import url from '../../config/api';

class DeleteSubscribe extends React.Component {

  constructor(props) {
    super(props);
    const item = this.props.navigation.getParam('item');
     this.state = {
        selected: false,
        item: item
    }

    console.log(this.state.item)
  }

  componentDidMount() {
    //const item = this.props.navigation.getParam('item');

  }
  openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
  };

  ratingCompleted(rating) {
  console.log("Rating is: " + rating)
  };

  onPressSubmit = item => {
  this.props.navigation.navigate('Confirmation', { item });
  };

  deleteSubscription(id){
    console.log(id);
    this.props.deleteSubscription(id).then(res => {
      if(res.status == 'success'){
        showToast('Subscription deleted successfully', "success");
        this.props.navigation.navigate('Subscription');
      }
    });
  }

  render(){
    return (
      <Container style={appStyles.container}>
       
       <Headers
          IconLeft='arrowleft'
          onPress={() => this.openControlPanel()}
          IconRightF='search'
          setCart={true}
          bgColor='transparent'
          Title='Delete Subscription'
         />
      
         <ScrollView>
         { this.props.isLoading ?
          <Spinner color={Colors.secondary} style={appStyles.spinner} /> :
          (<View>
            <Card style={[appStyles.addBox,{height:'auto'},styles.paddingBox]}>
              <Grid>
              
                 <Row style={styles.secondRow}>
                  <Col style={styles.amulCol}>
                    <Image source={{uri: url.imageURL+this.state.item.imagePath} }  style={styles.amulMoti} />
                  </Col>
                  <Col style={styles.amulInfo}>
                    <View>
                     <Text style={styles.AmuText}>{this.state.item.brandName}</Text>
                     <Text style={[styles.AmuText,styles.AmuTextTitle]}>{this.state.item.itemName}</Text>
                     <Text style={styles.AmuText}>{this.state.item.weight} {this.state.item.uom}</Text>
                     <Text style={styles.AmuText}>Qty: {this.state.item.quantity}</Text>
                     <Text style={styles.AmuText}>MRP: <Text style={{}}>{'\u20B9'}</Text> {this.state.item.price}</Text>
                    </View>
                  </Col>
                </Row>
                
              </Grid>
            </Card>
           

            <View style={styles.cancelReasonBox}>
              <Text style={styles.reasonTitle}>
               Cancellation Reason
              </Text>  
              <Card style={styles.listArea}> 
                  <List>
                  {
                    CancelReason.map(data=>(
                        <ListItem noBorder icon key={data.key} style={styles.ListReason}>
                          <Left style={styles.reasonBody} onPress={() => this.setState({ selected: !this.state.selected })}>
                            <Radio type="radio" selected={false} color={Colors.primary} selectedColor={Colors.primary}  />
                            </Left>
                            <Body style={styles.reasonBody}>
                            <Text style={styles.reasonText}>{data.reason}</Text>
                            </Body>
                        </ListItem>
                      ))
                  }
                  
                  </List>
                  <View style={{paddingLeft:Layout.indent, marginTop:10}}>
                    <Text style={{color:Colors.primary,fontFamily:'Font-Medium',lineHeight:18}}>Note: Please select  accurate reason for quicker refund process</Text>
                  </View>
               </Card>
            </View>
      <TouchableOpacity style={styles.submitBtnArea} >
        <Button primary full style={styles.submitBtn} onPress={()=>this.deleteSubscription(this.state.item.id)}>
        <Text style={styles.submitText}>Delete Subscription
        </Text>
        </Button>
      </TouchableOpacity>
      </View>)}
    </ScrollView>
    
      </Container>
     
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.common.isLoading,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      deleteSubscription: (id) => dispatch(subscriptionAction.deleteSubscription({id: id}))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(DeleteSubscribe);
// Exports
