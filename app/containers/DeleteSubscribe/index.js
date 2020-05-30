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
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { CancelReason } from '../data/data';

class DeleteSubscribe extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
    selected: false,
    
    }
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
            <Card style={[appStyles.addBox,{height:'auto'},styles.paddingBox]}>
              <Grid>
              
                 <Row style={styles.secondRow}>
                  <Col style={styles.amulCol}>
                    <Image source={imgs.amulMoti} style={styles.amulMoti} />
                  </Col>
                  <Col style={styles.amulInfo}>
                    <View>
                     <Text style={styles.AmuText}>Amul</Text>
                     <Text style={[styles.AmuText,styles.AmuTextTitle]}>Amul Moti</Text>
                     <Text style={styles.AmuText}>500 ml</Text>
                     <Text style={styles.AmuText}>Qty: 1</Text>
                     <Text style={styles.AmuText}>MRP: <Text style={{}}>{'\u20B9'}</Text> 28</Text>
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
        <Button primary full style={styles.submitBtn} onPress={()=>this.onPressSubmit('DeleteSubscribe')}>
        <Text style={styles.submitText}>Delete Subscription
        </Text>
        </Button>
      </TouchableOpacity>
    </ScrollView>
    
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
export default connect(mapStateToProps, mapDispatchToProps)(DeleteSubscribe);
// Exports
