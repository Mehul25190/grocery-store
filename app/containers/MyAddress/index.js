import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import _ from 'lodash';
import { Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right, Card, Grid, Row, Col, Form, Picker, Input, Item
} from 'native-base';
import { showToast } from '../../utils/common';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { CityList, DeliveryAreaList, ChooseAreaList } from '../data/data';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class MyAddress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      delAddress: '',
      selected: '0',
      edit: true,
      id:null,
      cityId:1,
      areaId:1,
      buildingName:'',
      aptNo:'',
      specialIns:'',
      zipcode:'',
      cityData: [], 
      selectedCity: '',
      areaData:[],
      selectedArea:'',
      setDeliveryAddress:[],
      

    }
    //console.log(this.state.edit);
  }
  componentDidMount() {
    this.setState({
      delAddress: '123, Block-B, Divyajiavn Aprtment, Bapunagar Aproach, Ahmedabad - 352350.'
    });
    //set array from city list from api to get city list
    
    this.getCityList();
    //this.getAreaList();
    this.getDeliveryAddress();  
     
  }
  //get Delivery address
  getDeliveryAddress(){
    //console.log(this.props.user);
    //alert(this.props.user.user.id);  
    this.props.showDeliveryAddress(this.props.user.user.id).then (res => {
      
      if(res.status == "success"){
       // console.log(res.data.userAddress);
            if(res.data.userAddressDtls !="") {
              //console.log('inside');
              this.setState({ setDeliveryAddress:res.data.userAddressDtls});
              this.setState({id:res.data.userAddressDtls.id});
              this.setState({buildingName:res.data.userAddressDtls.buildingName});
              this.setState({aptNo:res.data.userAddressDtls.aptNo});
              this.setState({specialIns:res.data.userAddressDtls.specialIns});
              this.setState({zipcode:res.data.userAddressDtls.zipcode});
              this.setState({selectedCity:res.data.userAddressDtls.cityId});
              this.setState({selectedArea:res.data.userAddressDtls.areaId});
              this.getAreaList(res.data.userAddressDtls.cityId);
            }

        } else {
              //console.log("something wrong with varification call");
              showToast("Something wrong with Server response","danger");
        }

    })
    .catch(error => {
      console.log('Error messages returned from server', error);
      showToast("Error messages returned from server","danger");
    });

  }

  //get city List  
  getCityList() {
    
    this.props.showCityList().then (res =>{
       //console.log(res.status); 
        if(res.status == "success"){
              this.setState({ cityData:res.cityList, 
                selectedCity: this.state.selectedCity=="" ? res.cityList[0].id: this.state.selectedCity });
             
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

  //get area List  
  getAreaList(city_id) {
    
    this.props.showAreaList(city_id).then (res =>{
       //console.log(res.status); 
        if(res.status == "success"){
              this.setState({ areaData:res.data.areaList });
              if(this.state.selectedArea==null) {
                this.setState({selectedArea:res.data.areaList[0].id});
              }
             
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

  editAddress = () => {
    this.setState({
      edit: !this.state.edit
    });
    //console.log(this.state.edit);
  }
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  }
  onValueChange(value: string) {
    this.setState({
      selected: value,
      switch1Value: value
    });
  }

  onValueChangeCity(value: string) {
    this.setState({
      selectedCity: value,
      selectedArea: null

    });
    this.getAreaList(value);
    
  }
  onValueChangeArea(value: string){
    this.setState({
      selectedArea:value
    });
  }

  //save address
  saveAddress() {

    if(this.state.buildingName.trim() == ""){
      this.setState({isLoading: false}, function() {
        showToast('Please enter Building Name.','danger');
      });
    }else {
      //call api
      const formdata = { userId:this.props.user.user.id,
                        cityId:this.state.selectedCity,
                        areaId:this.state.selectedArea,
                        state:'Gujarat',
                        country:'India',
                        buildingName:this.state.buildingName,
                        aptNo:this.state.aptNo,
                        specialIns:this.state.specialIns,
                        zipcode:this.state.zipcode,
                        id:this.state.id,

                      };
      this.props.saveAddress(formdata).then (res =>{
        
        if(res.data.status == "success"){
              //this.setState({ categoryData:res.data.category });
              showToast("Save Successfully","success");
              //this.props.navigation.navigate(Screens.SignIn.route)
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

  }

  render() {
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
          <Card style={[appStyles.addBox, { height: 'auto', marginTop: 15, position: 'relative' }]}>
            <Icon type='MaterialIcons' name='my-location' style={styles.locationIcon} />
            <GooglePlacesAutocomplete
              placeholder='Choose Current Location'
              minLength={2}
              autoFocus={true}
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
          {/*  <Grid style={{marginTop:20,marginBottom:20}}>  
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

             </Grid> */ }
          {(this.state.delAddress == '' || this.state.edit == false) &&

            (<Card style={[appStyles.addBox, { height: 'auto', paddingTop: 8, position: 'relative' }]}>
              <View>
                {/* 
                <Text style={[styles.addressTextStyle, { textAlign: "center" }]}>Add New Address </Text>
                */}
              </View>
              <Form>
                <View style={styles.reasonView} >
                  <Item style={{ borderBottomWidth: 0 }} >
                    <Picker
                      note
                      mode="dropdown"
                      itemStyle={{ fontFamily: 'Font-Medium' }}
                      itemTextStyle={{ fontFamily: 'Font-Medium' }}
                      textStyle={{ fontFamily: 'Font-Medium' }}
                      style={styles.dorpDownReason}
                      selectedValue={this.state.selectedCity}
                      onValueChange={this.onValueChangeCity.bind(this)}
                      placeholderStyle={{ borderWidth: 10, fontFamily: 'Font-Medium' }}
                      placeholderIconColor={{ borderWidth: 2 }}
                    >
                      {

                        this.state.cityData.map(data => (
                          <Picker.Item key={data.id} label={data.cityName} value={data.id} />
                        ))
                      }


                    </Picker>
                    <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                  </Item>
                </View>

                <View style={styles.reasonView} >
                  <Item style={{ borderBottomWidth: 0 }} >
                    <Picker
                      note
                      mode="dropdown"
                      itemStyle={{ fontFamily: 'Font-Medium' }}
                      itemTextStyle={{ fontFamily: 'Font-Medium' }}
                      textStyle={{ fontFamily: 'Font-Medium' }}
                      style={styles.dorpDownReason}
                      selectedValue={this.state.selectedArea}
                      onValueChange={this.onValueChangeArea.bind(this)}
                      placeholderStyle={{ borderWidth: 10, fontFamily: 'Font-Medium' }}
                      placeholderIconColor={{ borderWidth: 2 }}
                    >
                      {

                        this.state.areaData.map(data => (
                          <Picker.Item key={data.id} label={data.areaName} value={data.id} />

                        ))

                      }


                    </Picker>
                    <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                  </Item>
                </View>
                 {/*       
                <View style={styles.reasonView} >
                  {/* <Item style={{ borderBottomWidth: 0 }} >
                    <Picker
                      note
                      mode="dropdown"
                      itemStyle={{ fontFamily: 'Font-Medium' }}
                      itemTextStyle={{ fontFamily: 'Font-Medium' }}
                      textStyle={{ fontFamily: 'Font-Medium' }}
                      style={styles.dorpDownReason}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}
                      placeholderStyle={{ borderWidth: 10, fontFamily: 'Font-Medium' }}
                      placeholderIconColor={{ borderWidth: 2 }}
                    >
                      <Picker.Item label="Choose Your Area" style={{ fontFamily: 'Font-Medium' }} value="0" />
                      {

                        ChooseAreaList.map(data => (
                          <Picker.Item key={data.key} label={data.area} value={data.key} />

                        ))

                      }


                    </Picker>
                    <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                    </Item> */}
                 

                <View style={styles.InputView} >
                  <Input placeholderTextColor="#B9B9B9" placeholder="Enter Building Name" style={styles.inputText}
                  value={this.state.buildingName} 
                  onChangeText={(value) => {this.setState({buildingName:value});} }  />
                </View>
                <View style={styles.InputView} >
                  <Input placeholderTextColor="#B9B9B9" placeholder="Apt.No." style={styles.inputText}
                  value={this.state.aptNo} 
                  onChangeText={(value) => {this.setState({aptNo:value});} }
                  />
                </View>
                <View style={styles.InputView} >
                  <Input placeholderTextColor="#B9B9B9" placeholder="Special Instruction" style={styles.inputText}
                  value={this.state.specialIns} 
                  onChangeText={(value) => {this.setState({specialIns:value});} }
                  />
                </View>
                <View style={styles.InputView} >
                  <Input placeholderTextColor="#B9B9B9" placeholder="PostBox No." style={styles.inputText}
                  value={this.state.zipcode.toString()} 
                  onChangeText={(value) => {this.setState({zipcode:value});} }
                  />
                </View>
                {<Grid style={{ marginTop: 20, marginBottom: 20 }}>
                  <Row>
                    <Col style={{ justifyContent: 'flex-start' }}>
                      <TouchableOpacity  >
                        <Button full primary style={[styles.saveBtn]} onPress={() => this.saveAddress()}>
                          <Text
                            style={[styles.saveBtnText, { textAlign: "center" }]}>Save
                                            </Text>
                        </Button>
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ justifyContent: 'flex-end' }}>
                      <TouchableOpacity  >
                        <Button full primary style={styles.saveBtn} onPress={() => this.editAddress()}>
                          <Text style={[styles.saveBtnText, { textAlign: "center" }]}>Cancel </Text>
                        </Button>
                      </TouchableOpacity>
                    </Col>
                  </Row>

                </Grid>}
              </Form>
            </Card>)}
          {(this.state.delAddress !== '' || this.state.edit == false) &&
            (<Card style={[appStyles.addBox, { height: 'auto', position: 'relative' }]}>
              <Grid>
                <Row style={{}}>
                  <Col style={{ justifyContent: 'flex-start' }}>
                    <View>
                      <Text style={{ color: Colors.primary, fontFamily: 'Font-Medium', padding: 10 }}>Delivery Address
                           </Text>
                    </View>
                  </Col>
                  {this.state.edit == true &&
                    (<Col style={{ justifyContent: 'flex-end' }}>
                      <TouchableOpacity style={styles.EditIconStyle} onPress={() => this.editAddress()}>
                        <Icon name='edit' type='MaterialIcons' style={[appStyles.IconGreen, { paddingRight: 15 }]} />

                      </TouchableOpacity>

                    </Col>)}

                </Row>
                {this.state.setDeliveryAddress != null ?
                  (<Row>

                  <View>
                    <Text style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10, fontFamily: 'Font-Medium', fontSize: 14 }}>
                      {(this.state.setDeliveryAddress.aptNo!="" ? this.state.setDeliveryAddress.aptNo + "," : "" )}, 
                      {(this.state.setDeliveryAddress.buildingName!="" ? this.state.setDeliveryAddress.buildingName + "," : "")}
                    </Text>
                    <Text style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10, fontFamily: 'Font-Medium', fontSize: 14 }}>  
                      {(this.state.setDeliveryAddress.areaName!="" ? this.state.setDeliveryAddress.areaName + ",": "")}, 
                      {(this.state.setDeliveryAddress.zipcode!="" ?  this.state.setDeliveryAddress.zipcode+",":"")}, 
                      {(this.state.setDeliveryAddress.cityName!=""? this.state.setDeliveryAddress.cityName : "")}
                    </Text> 
                  </View>
                </Row>): null}


              </Grid>
            </Card>)}

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
    showCityList: () => dispatch(userActions.showCityList()),
    showAreaList:(cityID) => dispatch(userActions.showAreaList({city:cityID})),
    saveAddress: (formdata) => dispatch(userActions.saveUserAddress(formdata)),
    
    showDeliveryAddress: (userid) => dispatch(userActions.getDeviveryAddress({userId:userid})),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);