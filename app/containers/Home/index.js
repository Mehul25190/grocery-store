import React from 'react'
import { StyleSheet, View, ImageBackground, Image,StatusBar} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Grid,Col,Card

} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Container style={appStyles.container}>
      
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
            <Card style={styles.addBox}>
            <Grid>
              <Col style={{ marginLef:5,width: 150 }}>
                 <Image source={imgs.megaSale} style={{flex: 1, height: null, width: null}} />
              </Col>
              <Col style={{  }}>
                <View style={styles.discountBlock}>
                  <Text style={styles.addsSubTitle}>
                      SAVE UP TO
                  </Text>
                  <Text style={styles.addsBigTitle}>
                     50% OFF
                  </Text>
                  <Text style={styles.addsText}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                
                  </Text>
                  <View style={styles.btnBlock}>
                   <Button transparent tyle={{textAlign:'right'}}>
                     <Text style={styles.discountBtn}>Get Discount</Text>
                    </Button>
                  </View>
                </View>
              </Col>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);