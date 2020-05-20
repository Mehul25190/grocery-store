import React from 'react'
import { StyleSheet, View,TouchableHighlight,Image,FlatList,ScrollView, ImageBackground, StatusBar,TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers,LoginBackIcon } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Button,
  Text,
  Header,  Title, Grid,Col,Card,List, ListItem, Left, Body, Right, Thumbnail,
} from 'native-base';
import {ItemList} from '../data/data';
import {categoryList} from '../data/data';
import {filterList} from '../data/data';
import {productList} from '../data/data';
//import MasonryList from "react-native-masonry-list";
//import Category from 'react-native-category';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import NumericInput from 'react-native-numeric-input';
import PropTypes from 'prop-types';

let gm='gm';
class ProductList extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    dataSource:productList,
    value:1,
    
  };
}

  componentDidMount() {
    this.setState({
      dataSource: productList,
      value:1

    });
  }
//func call when click item category
_itemChoose(item) {
  // alert(item.title);
}
_filterChoose(item){

}
onPressRecipe(item){
  alert(this.item);
}

 openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
};

 handleItemCategoryClick(category, rowID) {
   alert(this.category);
  }

 //render Item
  renderItemCategory=({item, index})=> (
      <TouchableOpacity 

        onPress={this.handleItemCategoryClick.bind(this, item.title, index)}

        style={[styles.itemStyles]}>
          <Text style={[styles.textItemStyles]}>
            {item.title}
          </Text>
      </TouchableOpacity>
   );
    
    

  render(){

    const { navigation } = this.props;
    const getTitle = navigation.getParam('item');
    return (
      <Container style={appStyles.container}>
      
         <Headers
            IconLeft='arrow-back'
            onPress={() => this.openControlPanel()}
            IconRightS=''
            IconRightF='search'
            bgColor='transparent'
            Title= {getTitle.title}  />

          <Content enableOnAndroid style={appStyles.content}>
           
           <Card style={appStyles.addBox}>
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

              <FlatList
                style={[styles.categoryStyles]}
                contentContainerStyle={styles.flatListStyles}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={this.renderItemCategory}
                data={categoryList}
              />
            {/*
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
                          />*/
                        }
              <View>
                  <Grid>
                    <Col style={{justifyContent:'flex-start',width:40}}>
                      
                      <Image source={imgs.filterIcon} style={styles.filterIconstyle} />
                  </Col>
                  <Col style={{JustifyContent:'flex-end'}}>
                
                {/*
                      
                    <Category
                    data={filterList}    
                    itemSelected={(filterItem) => this._filterChoose(filterItem)}
                    itemText={'title'} 
                    colorTextDefault={'gray'} 
                    colorTextSelected={'#333'} 
                    colorItemDefault={'#fff'}
                    colorItemSelected={'#ddd'}
                    itemStyles={styles.filterItemStyles}
                    style= {{ backgroundColor: '#fff'}}
                    textItemStyles={styles.filterStyles}
                     />
              */  } 
                  </Col>
                  </Grid>
              </View>
             
              
               {/* <FlatList */ 
               //    style={{marginTop:40}}
               //    data={this.state.dataSource}
               //    renderItem={({item})=>(
                   
               //    )}
               //    numColumns={3}
               //    keyExtractor={(item, index) => index.toString()}
               //  /> */
             }
                
           {

             productList.map((item, index) => {
                  return (
                  
                       <ListItem style={styles.ListItems} noBorder>
                        <Left style={styles.ListLeft}>
                          <Image style={styles.proImage} source={item.image} />
                        </Left>
                        <Body style={{textAlign:'left'}}>
                          <View style={styles.prodInfo}>
                            <Text style={styles.proTitle}>{item.proName}</Text>
                            <Text style={styles.proQuanitty} note>{item.quantity} pc &nbsp;  
                            {
                              item.weight!=='' ? '('+ item.weight +' '+gm+ ')' :''
                            } </Text>
                            <Text style={styles.proPrice}>{'\u20B9'}{item.price}</Text>
                          </View>
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

                                step={1}
                                valueType='real'
                                rounded 
                                textColor='#F8BB1B' 
                                iconStyle={{ color: '#F8BB1B' }} 
                                rightButtonBackgroundColor='#fff' 
                                leftButtonBackgroundColor='#fff'/>
                          </View> 
                          <View>
                            
                          {
                            index == 0 || index == 2?
                          
                            <Button style={styles.subscribeBtn}>
                             <TouchableOpacity>
                              <Text style={styles.subText}>
                               Subscribe@{'\u20B9'}12
                              </Text>

                              </TouchableOpacity>
                            </Button>:
                            <View style={{padding:0,margin:0}}>
                            </View>
                          }
                            <Button style={styles.buyButton}>
                             <TouchableOpacity>
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
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);