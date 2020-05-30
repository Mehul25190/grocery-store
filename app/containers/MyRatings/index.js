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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { AirbnbRating } from 'react-native-ratings';

class MyRatings extends React.Component {

  constructor(props) {
    super(props);
  }
  openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }
    ratingCompleted(rating) {
    console.log("Rating is: " + rating)
    }
    onPressRating = item => {
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
              Title='My Ratings & Reviews'
             />
      
         <ScrollView>
        <Card style={[appStyles.addBox,{height:'auto'},styles.paddingBox]}>
          <Grid >
          
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
        <View style={styles.rateItems}>
          <Text style={styles.rateText}>
          Rate the item
          </Text>
           <Card style={[appStyles.addBox,styles.starBox]}>
           <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={4}
            size={25}
            showRating={false}
            onFinishRating={this.ratingCompleted}
            starContainerStyle={{alignSelf:'flex-start'}}
            selectedColor="#FFC106"

            />
           
          </Card>
        </View>

        <View style={styles.writeReview}>
          <Text style={styles.rateText}>
          Add a Written Review
          </Text>  
          <Card style={styles.textArea}> 
          <TextInput
           placeholder="Tell us what you like or dislike about this product. "
            multiline={true}
            numberOfLines={4}
             style={styles.textAreaStyle}
           underlineColorAndroid={'transparent'}
           />
        </Card>
        </View>
    </ScrollView>
      <TouchableOpacity style={styles.submitBtnArea} >
        <Button primary full style={styles.submitBtn} onPress={()=>this.onPressRating("Confirm")}>
        <Text style={styles.submitText}>Submit
        </Text>
        </Button>
      </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyRatings);
// Exports
