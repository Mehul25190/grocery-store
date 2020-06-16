import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, ScrollView} from 'react-native'
import _ from 'lodash'; 
import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers, } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,Item,Input,DatePicker,Label, Picker
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList,productImages} from '../data/data';
import NumericInput from 'react-native-numeric-input';
import CheckBox from 'react-native-check-box';
import { AirbnbRating } from 'react-native-ratings';

import Carousel,{Pagination } from 'react-native-snap-carousel';

import url from '../../config/api';


const Qty =[
  {
    key:1,
    qty:'1'
  },
  {
    key:2,
    qty:'2'
  },
  {
    key:3,
    qty:'3'
  }
];
class ProductDetail extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
      time: '',
      selected: "0",
       selectedIndex: 0,
       productImages:''
    };
    
  }
   onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

   componentDidMount() {
    var that = this;
    var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date().getDate(); //Current Date
    var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    that.setState({
      productImages:productImages,
      //Setting the value of the date time
      date:   date + ' ' + month + ' ' + year ,
      time:   hours + ':' + min 
    });
   
  }

  openControlPanel = () => {

    this.props.navigation.goBack(); // open drawer
  };

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };   
  _renderItem = ({item, index}) => {
        return (
           <View>
            <Image source={imgs.amulMoti} style={styles.amulMoti} />
          </View>
          
        );
    }
     get pagination () {
        const { productImages, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={productImages.length}
              activeDotIndex={activeSlide}
              containerStyle={{paddingTop:10,paddingBottom:0}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: Colors.primary
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

  render(){

    const { entries, activeSlide } = this.state;

    const { navigation, ProductDetail } = this.props;
    console.log(ProductDetail);

    const getItem = navigation.getParam('item');
    const { selectedIndex } = this.state;
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
             
              setCart={true}
              bgColor='transparent'
              Title='Product Detail'
             />
      
          <Content enableOnAndroid>
       
        
          <Grid style={styles.paddingBox}>

            <Row style={styles.firstRow}>
              <Col >
                <View>
                 <Text style={styles.AmuText}>{ProductDetail.item[0].brandName}</Text>
                 <Text style={[styles.AmuText,styles.AmuTextTitle]}>{ProductDetail.item[0].itemName}</Text>
                 <Text style={styles.AmuText}>{ProductDetail.item[0].weight} {ProductDetail.item[0].uom}</Text>
                
                </View>
              </Col>
              <Col style={styles.QtyBox}>
                <View>
                   <AirbnbRating
                      count={5}
                      reviews={[]}
                      defaultRating={4}
                      size={15}
                      showRating={false}
                      style={{pointerEvents:'none'}}
                      starContainerStyle={{alignSelf:'flex-start',pointerEvents:'none'}}
                      selectedColor="#FFC106"

                      />
                </View> 
              </Col>

             </Row>

            <Row style={styles.secondRow}>

            <Col style={{justyfyContent:'center',alignItems:'center',marginLeft:Layout.indent,marginRight:Layout.indent}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              loop={true}
              autoplay={true}

              data={productImages}
              renderItem={this._renderItem}
              sliderWidth={Layout.window.width}
              itemWidth={Layout.window.width}
              autoplayInterval={3000}
              autoplayDelay={3000}
                 onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            { this.pagination }
             </Col>   
              

               {/* <Image source={{uri: url.imageURL+ProductDetail.itemImages[0].imagePath}} style={styles.amulMoti} />*/}

            </Row>

            
          </Grid>

         
        
    
        <View style={styles.pricePart}>
          <Text style={styles.priceText}><Text style={appStyles.currency,{fontSize:23,color:Colors.gray}}> {'\u20B9'}</Text> {ProductDetail.item[0].discountedPrice ? ProductDetail.item[0].discountedPrice : ProductDetail.item[0].price}</Text>
        </View>

        <Grid>
         <Row>
            <Col>
               <View  style={styles.reasonView}>
                <Item style={{borderBottomWidth:0}} >
                 <Picker
                  note
                  textStyle={{fontFamily:'Font-Medium'}}
                  mode="dropdown"
                  style={{fontFamily:'Font-Medium' ,}}
                  selectedValue={this.state.selected}
                  
                  onValueChange={this.onValueChange.bind(this)}
                
                  placeholderStyle={{borderWidth:10, fontFamily:'Font-Medium' }}
                  placeholderIconColor={{borderWidth:2}}
                   >
                  <Picker.Item label="Qty" color={Colors.gray} style={{fontFamily:'Font-Medium'}}  value="0" />
                  <Picker.Item label="2" value="1" />
                  <Picker.Item label="3" value="2" />
                  <Picker.Item label="4" value="3" />
                  <Picker.Item label="5" value="4" />

                </Picker>
                    <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                </Item>
              </View>
            </Col>
          <Col style={styles.cartPart}>
          {/*  <Icon name='shopping-cart' type='MaterialIcons' style={styles.bottomCart} /> */}
          </Col>
         </Row>
        </Grid>
        
       
        <View>
          <Text style={styles.title}>Product Description </Text>
        </View>

        <Card style={[appStyles.addBox,styles.deliveryAddress,{elevation:1}]}>
          <View>
            <Text style={{fontFamily:'Font-Regular',color:Colors.gray,fontSize:14}}>
              {ProductDetail.item[0].description1}
             </Text>
           </View>
        </Card>

        <View style={styles.okayBtnArea}>
          <Button priamary full style={styles.doneBtn}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate(Screens.Home.route)}>
             <Text style={styles.btnTextDone}>Continue Shopping</Text>
            </TouchableOpacity>
          </Button>
        </View>
           
         
        <TouchableOpacity>     
          <Button style={styles.payBtn} primary full onPress={()=>this.props.navigation.navigate(Screens.Checkout.route)}>
            <Text style={styles.payTextNow}>Check Out</Text>
          </Button>
        </TouchableOpacity>
       
        
        </Content>
      
    </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    ProductDetail: state.product.productDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);