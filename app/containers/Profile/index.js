import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Switch } from 'react-native'
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
  Body, Title, Card, Grid, Row, Col, Form, Item, Label, Input, Picker
} from 'native-base';

import { showToast } from '../../utils/common';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CheckBox from 'react-native-check-box';
import moment from "moment";
import DatePicker from 'react-native-datepicker';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //selectedEthenicity: "key0",
      //selectedG: "0",
      chosenDate: new Date(),
      checked: true,
      //switch1Value: false,
      firstName:"",
      lastName:"",
      gender:"0",
      dob:"",
      ethnicity:"key0",
      promotionalEmail:true,
      ringBell:false,
      mobileNo:"",
      email:"",
      isLoading: false,
      //USERID:1,
      setUserData:[],

    };
    this.checkBoxtTest = this.checkBoxtTest.bind(this);
    this.setDate = this.setDate.bind(this);

  }

  componentDidMount() {
    this.setState({
      //delAddress: '123, Block-B, Divyajiavn Aprtment, Bapunagar Aproach, Ahmedabad - 352350.'
    });
    
    this.getUserProfile();  

   //alert(this.props.user.user.mobile);
  
    
  }
  //get User Profile
  getUserProfile(){

    this.props.showUserProfile(this.props.user.user.id).then (res => {
      if(res.status == "success"){

        if(res.data.userProfile.length > 0){
          //alert(this.props.user.user.mobile);
          //this.setState({ setUserData:res.data.userProfile});
          this.setState({firstName:res.data.userProfile[0].firstName});
          this.setState({lastName:res.data.userProfile[0].lastName});
          this.setState({mobileNo:this.props.user.user.mobile});
          this.setState({email:this.props.user.user.email});
          //startDate: item.startDate ? moment(item.startDate).format('MM/DD/YYYY') : '',
          if(res.data.userProfile[0].dob != null)
            this.setState({dob:moment(res.data.userProfile[0].dob.date).format('MM/DD/YYYY')});
          this.setState({gender:res.data.userProfile[0].gender});
          this.setState({ethnicity:res.data.userProfile[0].ethnicity});
          this.setState({promotionalEmail:res.data.userProfile[0].promotionalEmail});
          this.setState({ringBell:res.data.userProfile[0].ringBell});
        }
        this.setState({mobileNo:this.props.user.user.mobile});
        this.setState({email:this.props.user.user.email});

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

  checkBoxtTest = () => {
    this.setState((prevState) => ({ check: !prevState.check }));
  }

  //selected ring bell
  toggleSwitch1 = (value) => {
    this.setState({
      ringBell: value,
      
    });
    //alert(value);
  }

  //selected ethencity
  onValueChange(value: string) {
    this.setState({
      ethnicity: value,
      //switch1Value: value
    });
    //alert(value);
  }

  //selected Gender
  onValueChangeGender(value: string) {
    this.setState({
      gender: value,
    });
    //alert(value);
  }
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  }

  //set birthdate
  setDate(newDate) {
    this.setState({ dob: moment(newDate).format('MM/DD/YYYY') });
    //alert(this.state.chosenDate);

  }

  
  //save profile
  saveProfile() {

    if(this.state.firstName.trim().length == 0){
      this.setState({isLoading: false}, function() {
        showToast('Please enter firstname.','danger');
      });
    }else {
      //alert("ADFD");
      //call api
      const formdata = { userId:this.props.user.user.id,
                        firstName:this.state.firstName,
                        lastName:this.state.lastName,
                        //mobileNo:this.state.mobileNo,
                        //email:this.state.email,
                        dob:this.state.dob,
                        gender:this.state.gender,
                        ethnicity:this.state.ethnicity,
                        promotionalEmail:this.state.promotionalEmail,
                        ringBell:this.state.ringBell,

                      };
      //alert(formdata);
      this.props.saveProfile(formdata).then (res =>{
      
        if(res.status == "success"){
              //this.setState({ categoryData:res.data.category });
              showToast("Save Successfully","success");
              this.props.navigation.navigate(Screens.Home.route)
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
          IconRightS=''
          IconRightF=''
          bgColor='transparent'
          Title='Update Profile'

        />
       <Content enableOnAndroid style={appStyles.content}>
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (
            <View>

          <Form>
            <Grid>
              <Col>
                <Item style={[styles.itemStyle, { justifyContent: 'flex-start' }]} stackedLabel>
                  <Label style={styles.labelText}> First Name</Label>
                  <Input style={styles.inputStyle} 
                    value={this.state.firstName} 
                    onChangeText={(value) => {this.setState({firstName:value});} } 
                  />
                </Item>
              </Col>

              <Col>
                <Item style={[styles.itemStyle, { justifyContent: 'flex-start' }]} stackedLabel>
                  <Label style={styles.labelText}> Last Name</Label>
                  <Input style={styles.inputStyle}
                  value={this.state.lastName} 
                  onChangeText={(value) => {this.setState({lastName:value});} } 
                  />
                </Item>
              </Col>
            </Grid>

            <Item style={[styles.itemStyle]} stackedLabel>
              <Label style={styles.labelText}>Mobile Number</Label>
              <Input style={styles.inputStyle} disabled value={this.state.mobileNo.toString()} 
              onChangeText={(value) => {this.setState({mobileNo:value});} }
             />
              
            </Item>

            <Item style={[styles.itemStyle]} stackedLabel>
              <Label style={styles.labelText}>Email Address</Label>
              <Input style={styles.inputStyle}
              value={this.state.email}  disabled
              onChangeText={(value) => {this.setState({email:value});} } 
               />
            </Item>


            <Grid>
              <Col>
                <View style={{ flex: 1, width: Layout.width, marginRight: Layout.indent, marginTop: 20 }}>
                  <Item style={styles.datePickerItem}>

                    <Label style={styles.labeldateText}>Date of Birth</Label>
                    <DatePicker
                      defaultDate={this.state.dob ? this.state.dob : new Date()}
                      minimumDate={Date(1920, 1, 1)}
                      maximumDate={new Date(2010, 12, 31)}
                      locale={"en"}
                      format="MM/DD/YYYY"
                      onDateChange={this.setDate}
                      date={this.state.dob}
                      confirmBtnText="Done"
                      cancelBtnText="Cancel"
                      iconSource={imgs.calImg}
                      customStyles={{dateInput: { borderWidth:0, marginTop: 10 }}}
                   />

                    </Item>

                </View>
              </Col>

              <Col>
                <View style={{ paddingTop: 7, position: 'relative', marginRight: Layout.indent }}>
                  <Label style={[styles.labelText, { paddingLeft: Layout.indent, width: Layout.width }]}  >Gender</Label>
                  <Item style={{ height: 45, borderBottomWidth: 1, borderColor: Colors.primary }} >
                    <Picker
                      note
                      mode="dropdown"
                      style={{ flex: 1 }}
                      selectedValue={this.state.gender}
                      onValueChange={this.onValueChangeGender.bind(this)}
                      textStyle={{ fontFamily: 'Font-Medium' }}
                      style={styles.dorpDownReason}

                      onValueChangeGender={this.onValueChange.bind(this)}
                      placeholderStyle={{ borderWidth: 10, fontFamily: 'Font-Medium' }}
                      placeholderIconColor={{ borderWidth: 2 }}
                    >
                      <Picker.Item label="Select Gender" />
                      <Picker.Item label="Male" value="M" />
                      <Picker.Item label="Female" value="F" />


                    </Picker>
                    <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                  </Item>

                </View>
              </Col>
            </Grid>





            <View style={{ paddingTop: 10, position: 'relative', marginRight: Layout.indent }}>
             <Label style={[styles.labelText, { paddingLeft: Layout.indent, width: Layout.width }]}  >Ethencity</Label>
              <Item style={{}} >
                <Picker
                  note
                  mode="dropdown"
                  style={{ flex: 1 }}
                  //selectedValue={this.state.selected}
                  //onValueChange={this.onValueChangeGender.bind(this)}
                  selectedValue={this.state.ethnicity}
                  onValueChange={this.onValueChange.bind(this)} >
                  
                  <Picker.Item label="Select Ethencity" value="key0" />
                  <Picker.Item label="Asians" value="Asians" />
                  <Picker.Item label="Bengalis" value="Bengalis" />
                  <Picker.Item label="Parsis" value="Parsis" />
                  <Picker.Item label="Panjabis" value="Panjabis" />
                  <Picker.Item label="Aryan" value="Aryan" />
                  <Picker.Item label="Brahmin" value="Brahmin" />
                  <Picker.Item label="Rajput" value="Rajput" />
                  <Picker.Item label="Tamils" value="Tamils" />

                </Picker>
                <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
              </Item>

            </View>
            <Item style={{ FlexDirextion: 'row', justifyContent: 'flex-start', marginTop: 3, marginRight: Layout.indent }}>

              <CheckBox
                style={styles.checkboxStyle}
                onClick={() => {
                  this.setState({
                    promotionalEmail: !this.state.promotionalEmail
                  })
                }}
                checkedImage={<Icon name='check' type='AntDesign' style={{ color: Colors.primary }} />}
                unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{ color: 'transparent' }} />}
                
                isChecked={this.state.promotionalEmail}
                 />

              <Text style={styles.checkBoxStyle}>
                Send me emails on promotions,
                offers and services.
                  </Text>

            </Item>

            <View style={styles.ringBellBlock}>

              <Switch

                style={{ color: Colors.primary, }}
                onValueChange={this.toggleSwitch1}
                value={this.state.ringBell? true:false} />
              <View style={{ flex: 0, width: 50, }}>
                {
                  this.state.ringBell == false ?
                    <Icon name='notifications-off' type='MaterialIcons'
                      style={{ position: 'absolute', left: Layout.indent, color: Colors.lightIcon }} /> :
                    <Icon name='notifications' type='MaterialIcons'
                      style={{ position: 'absolute', left: Layout.indent, color: Colors.primary }} />
                }

              </View>


              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontFamily: 'Font-Medium', paddingTop: 3 }}> Ring a Bell </Text>
              </View>
            </View>

            <Row style={{marginTop:5, height:40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  {this.state.isLoading ? (
                    <View style={{}} >
                      <Spinner />
                    </View>
                  ):(
                    <View></View>
                  )}
            </Row>

            <TouchableOpacity onPress={() => console.log()}>
              <Button
                full
                primary
                style={appStyles.btnSecontary} onPress={() => this.saveProfile()}>
                <Text style={[appStyles.redButton]}>Save</Text>
              </Button>
            </TouchableOpacity>


          </Form>

         </View>
          )}           
        </Content>

      </Container>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoading: state.common.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    showUserProfile: (userid) => dispatch(userActions.showUserProfile({userId:userid})),
    saveProfile: (formdata) => dispatch(userActions.saveUserProfile(formdata))
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Profile);