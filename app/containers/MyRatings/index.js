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
import { showToast } from '../../utils/common';
import url from "../../config/api";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { AirbnbRating } from 'react-native-ratings';

class MyRatings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewComment:'',
      orderItemId:'',
      itemRating:0,
      itemId:'',

     
    }

    
  }
  openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
  }
  
  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
    this.setState({itemRating:rating});
    
  }

  onPressRating = item => {
      //rating add

      if(this.state.reviewComment.trim() == ""){
        this.setState({isLoading: false}, function() {
          showToast('Please enter review.','danger');
        });
      }else {
       
        const { navigation } = this.props;
        const orderItemId = navigation.getParam('orderItemId');
        //call api
        const formdata = { orderItemId:orderItemId,
                          userId:this.props.user.user.id,
                          itemId:item.itemId, 
                          itemRating:this.state.itemRating,
                          reviewComment:this.state.reviewComment,
                         };
        this.props.saveRating(formdata).then (res =>{
          
          if(res.data.status == "success"){
                showToast("Save Successfully","success");
                this.props.navigation.navigate('Confirmation', { item:'Confirm' });
          } else {
                console.log("something wrong with varification call");
                showToast("Something wrong with Server response","danger");
          }
           
        })
        .catch(error => {
            console.log('Error messages returned from server', error);
            showToast("Error messages returned from server","danger");
        });
  
      }  

   
   };
  render(){
    const { navigation } = this.props;
    const getItem = navigation.getParam('item');
    const orderItemId = navigation.getParam('orderItemId');
   //this.setState({orderItemId:getItem.itemId})
    //console.log(getItem);
    //this.state.orderItemId = getItem.itemId;
    //alert(getItem[0].itemName);
    //alert(getItem.itemId);
    console.log(orderItemId);
    console.log(getItem.itemId);
    //console.log(url.imageURL);

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
                
                <Image style={styles.amulMoti} source={{ uri: url.imageURL + getItem.imagePath }} />
              </Col>
              <Col style={styles.amulInfo}>
                <View>
                 
                  <Text style={[styles.AmuText,styles.AmuTextTitle]}>{getItem.itemName}</Text>
                 <Text style={styles.AmuText}>Qty: {getItem.quantity}</Text>
                 <Text style={styles.AmuText}><Text style={{}}>{Colors.CUR}</Text> {getItem.itemPrice}</Text>
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
            onFinishRating={this.ratingCompleted.bind(this)}
            starContainerStyle={{alignSelf:'flex-start'}}
            selectedColor="#FFC106"

            />
           
          </Card>
        </View>

        <View style={styles.writeReview}>
          <Text style={styles.rateText}>
          Write a review
          </Text>  
          <Card style={styles.textArea}> 
          <TextInput
           placeholder="Tell us what you like or dislike about this product. "
            multiline={true}
            numberOfLines={4}
             style={styles.textAreaStyle}
           underlineColorAndroid={'transparent'}
           onChangeText={(value) => {this.setState({reviewComment:value});} } 
            value={this.state.reviewComment}
           />
        </Card>
        </View>
    </ScrollView>
      <TouchableOpacity style={styles.submitBtnArea} >
        <Button primary full style={styles.submitBtn} onPress={()=>this.onPressRating(getItem)}>
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
      saveRating: (formdata) => dispatch(userActions.saveItemRating(formdata)),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyRatings);
// Exports
