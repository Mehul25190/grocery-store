import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors } from '../../constants';
import { Logo, Statusbar,Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Card,Grid,Row,Col
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class MyAddress extends React.Component {

  constructor(props) {
    super(props);
  }
   openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }
  render(){
    return (
      <Container style={appStyles.container}>
       
           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              setCart={true}
              IconRightF='search'
              bgColor='transparent'
              Title='My MyAddress'
            
           />
          <Content enableOnAndroid>
             <Card style={[appStyles.addBox,{height:'auto',marginTop:15, position:'relative'}]}>
              <Icon  type='MaterialIcons'  name='my-location' style={styles.locationIcon}   />
                  <GooglePlacesAutocomplete
                   placeholder='Choose Current Location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    styles={styles.currentLocationStyle}
                      onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                          }}
                      query={{
                        key: 'YOUR API KEY',
                        language: 'en',
                      }}
                      currentLocation={true}
                      currentLocationLabel='Current location'
                        />
             </Card>
              <Grid style={{marginTop:20,marginBottom:20}}>  
                <Row>   
                    <Col style={{ justifyContent:'flex-start'}}>
                        <TouchableOpacity style={[styles.savedAddress]} activeOpacity={0.5}>
                            <Text 
                                 style={[styles.SavedTextStyle,{textAlign: "center"}]}>Saved Address
                             </Text>
                         </TouchableOpacity>
                    </Col>
                    <Col style={{ justifyContent:'flex-end'}}>
                      <TouchableOpacity style={styles.addAddressStyle} activeOpacity={0.5}>
                            <Icon  name='plus'  type='AntDesign'   style={styles.IconNewStyle} />
                            <Text style={[styles.addressTextStyle,{textAlign: "center"}]}>Add New Address </Text>
                         </TouchableOpacity>
                    </Col>
                </Row>   
               </Grid> 
              <Card style={[appStyles.addBox,{height:'auto', position:'relative'}]}> 
                <Grid>  
                <Row style={{}}>   
                    <Col style={{ justifyContent:'flex-start'}}>
                        <View>
                            <Text style={{color:Colors.primary,fontFamily:'Font-Medium',padding:10}}>Default Address
                             </Text>
                         </View>
                    </Col>
                    <Col style={{ justifyContent:'flex-end'}}>
                      <TouchableOpacity style={styles.EditIconStyle}>
                            <Icon  name='edit'  type='MaterialIcons'   style={[appStyles.IconGreen,{paddingRight:15}]} />
                             
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.StrashIconStyle}>
                            <Icon  name='trash-alt'  type='FontAwesome5'   style={appStyles.IconGreen} />
                       </TouchableOpacity>
                    </Col>
                </Row>   
                <Row>   
                  <View style={{}}>
                    <Text style={{paddingLeft:10 , paddingRight:10,fontFamily:'Font-Medium',fontSize:14}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy
                    </Text>
                  </View>
                </Row>   

               </Grid> 
              </Card>

          </Content>
      
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
export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);