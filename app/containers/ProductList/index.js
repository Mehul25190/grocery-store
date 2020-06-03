import React from 'react'
import { StyleSheet, View,TouchableHighlight,Image,FlatList,ScrollView, ImageBackground, StatusBar,TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers,LoginBackIcon,Category } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Button,
  Text,
  Header,  Title, Grid,Col,Card,List, ListItem, Left, Body, Right, Thumbnail,
} from 'native-base';
import url from '../../config/api';
import {ItemList} from '../data/data';
import {categoryList} from '../data/data';
import {filterList} from '../data/data';
import {productList} from '../data/data';
//import MasonryList from "react-native-masonry-list";

import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import NumericInput from 'react-native-numeric-input';

let gm='gm';
class ProductList extends React.Component {

constructor(props) {

  super(props);
  this.state = {
    dataSource:productList,
    value:1,
    categoryId:this.props.navigation.getParam('para_categoryId'),
    productData:[],
  };
  
  console.log('here----->', this.props.navigation.getParam('para_categoryId'));
}

  componentDidMount() {
   this.setState({
      dataSource: productList,
      value:1,
      //categoryId:this.props.navigation.getParam('para_categoryId'),
    });
    //alert(this.state.categoryId);
    //get product list default base on category selected
    this.productItemList();
}

productItemList(){
  //alert(this.state.categoryId);
  this.props.productItemList(this.state.categoryId).then (res =>{
    console.log('sucess return');  
    if(res.status == "success"){
          this.setState({ productData:res.data.itemList });
          //console.log('set return');
          //console.log(res.data.itemList);
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
//func call when click item category
_itemChoose(item) {
 //  alert(item.title);
}
_filterChoose(item){

}
onPressRecipe(item){
  alert(this.item);
}
 openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
}
  render(){
     const { navigation } = this.props;
    const getTitle = navigation.getParam('item');
    const categoryName = this.props.navigation.getParam('categoryName');
    return (
      <Container style={appStyles.container}>
      
            <Headers
            IconLeft='arrowleft'
            //onPress={() => this.openControlPanel()}
            IconRightF='search'
            setCart={true}
            bgColor='transparent'
            Title= {categoryName}
            
           />
          <Content enableOnAndroid style={appStyles.content}>
           
          {/* <Card style={appStyles.addBox}>
                <Grid>
                  <Col style={{ marginLef:10,width: 170,}}>
                     <Image source={imgs.mangoSale} style={styles.mangoSale} />
                  </Col>
                  <Col style={{  }}>
                    <View style={styles.discountBlock}>
                      <Text style={styles.addsSubTitle}>
                         Mango 1 kg
                      </Text>
                      <Text style={styles.MRPtext}>
                         MRP &nbsp; <Text style={styles.currencyOffer}>{'\u20B9'}</Text>150
                      </Text>
                      
                      <Text style={styles.officePrice}>
                         Offer Price
                      </Text>
                        <Text style={styles.PriceRate}>
                          <Text style={styles.currencyPrice}>{'\u20B9'}</Text>95
                      </Text>
                      
                      <View style={styles.btnBlock}>
                       <Button transparent style={{textAlign:'right'}}>
                        <TouchableOpacity>
                         <Text style={styles.discountOrder}>Orde Now</Text>
                         </TouchableOpacity>
                        </Button>
                      </View>
                    </View>
                  </Col>
                 </Grid>
             </Card>
           */}
             <Category
                data={categoryList}    
                itemSelected={(item) => this._itemChoose(item)}
                itemText={'title'} 
                colorTextDefault={'#000'} 
                colorTextSelected={'#fff'} 
                colorItemDefault={'#fff'}
                itemStyles={styles.itemStyles}
                style= {{ backgroundColor: '#fff'}}
                textItemStyles={styles.textItemStyles}
              />
             
           {
              this.state.productData.map((item, index) => {
            // productList.map((item, index) => {
                  return (
                  
                       <ListItem style={styles.ListItems} noBorder key={index}>

                        <Left style={styles.ListLeft}>
                          <Image style={styles.proImage} source={{uri: url.imageURL+item.imagePath} }  />
                        </Left>
                        <Body>
                          <TouchableOpacity style={styles.prodInfo}  onPress={()=> this.props.navigation.navigate(Screens.ProductDetail.route)}>
                  <Text style={styles.proTitle}>{item.itemName}</Text>

                            <Text style={styles.proQuanitty} note>{item.quantity} pc &nbsp;  
                            {
                              item.weight!=='' ? '('+ item.weight +' '+gm+ ')' :''
                            } </Text>
                        
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start', alignItems:'flex-start'}}>                                       
                         {
                           (index == 0 || index == 2) &&
                              <Text style={styles.proPriceStrike}><Text style={appStyles.currency,{fontSize:18}}>{'\u20B9'}</Text> {item.price}</Text> }
                              <Text style={styles.proPrice}><Text style={appStyles.currency,{fontSize:18}}>{'\u20B9'}</Text> {item.price}</Text>
                        </View>    
                           
                             
                          </TouchableOpacity>
                        </Body>
                        <Right style={styles.ListRight}>
                          <View>
                             <NumericInput 
                                value={this.state.value} 
                                onChange={value => this.setState({value})} 
                                onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                totalWidth={90} 
                                totalHeight={20} 
                                iconSize={30}
                                borderColor='#F8BB1B'
                                 inputStyle={{fontSize:13}}
                                step={1}
                                valueType='real'
                                rounded 
                                textColor='#F8BB1B' 
                                iconStyle={{ color: '#F8BB1B',fontSize:14 }} 
                                rightButtonBackgroundColor='#fff' 
                                leftButtonBackgroundColor='#fff'/>
                          </View> 
                          <View>
                            
                          {
                            index == 0 || index == 2?
                          
                            <Button style={styles.subscribeBtn}>
                             <TouchableOpacity onPress={()=> this.props.navigation.navigate(Screens.SubscribeOrder.route)}>
                              <Text style={styles.subText}>
                               Subscribe@{'\u20B9'}12
                              </Text>

                              </TouchableOpacity>
                            </Button>:
                            <View style={{padding:0,margin:0}}>
                            </View>
                          }
                            <Button style={styles.buyButton}>
                             <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.MyCart.route)}>
                              {
                            index == 0 || index == 2?
                              <Text style={styles.buyText}>
                                Buy Once
                              </Text> :
                              <Text style={styles.buyText}>
                                Buy 
                              </Text>
                            }
                              </TouchableOpacity>
                            </Button>
                       
                          
                          </View>
                        </Right>
                      </ListItem>
                  
                  );
                })
           }
              </Content>

        
         { /*<Catalog {...this.props} />*/}
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
      productItemList : (categoryId) => dispatch(userActions.showProductList({categoryId:categoryId}))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);