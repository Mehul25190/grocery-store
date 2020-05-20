import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
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
  Header, Left, Body, Title, Right,Card
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
  
  render(){
    return (
      <Container style={appStyles.container}>
       
           
           <Headers
            IconLeft='arrow-back'
            onPress={() => this.openControlPanel()}
            IconRightS=''
            IconRightF='search'
            bgColor='transparent'
            Title='My MyAddress'
            
           />
          <Content enableOnAndroid>
             <Card style={[appStyles.addBox,{height:'auto'}]}>
                  <GooglePlacesAutocomplete
                   placeholder='Enter Location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    styles={{
                      textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}
                          placeholder='Search'
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