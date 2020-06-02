import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity,Switch} from 'react-native'
import _ from 'lodash'; 
import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar,Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
    Body, Title, Card,Grid,Row,Col,Form,Item,Label,Input,DatePicker,Picker
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CheckBox from 'react-native-check-box';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "key0",
       selectedG: "0",
      chosenDate: new Date(),
      checked: true,
        switch1Value: false,
     
    };
     this.checkBoxtTest = this.checkBoxtTest.bind(this);
  this.setDate = this.setDate.bind(this);
    
  }
 checkBoxtTest = () => {
    this.setState((prevState) => ({check: !prevState.check}));
  }
  toggleSwitch1= (value) =>{
      this.setState({
           switch1Value: value
      });
  }
  onValueChange(value: string) {
    this.setState({
      selected: value,
      switch1Value: value
    });
  }
   onValueChangeGender(value: string) {
    this.setState({
      selectedG: value,
     
    });
  }
   openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }
    setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  render(){
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
          <Content enableOnAndroid>
            
            <Form>
             <Grid>
              <Col>
               <Item style={[styles.itemStyle,{justifyContent:'flex-start'}]} stackedLabel>
                  <Label style={styles.labelText}> First Name</Label>
                  <Input  style={styles.inputStyle} />
                </Item>
              </Col>
         
              <Col>
                <Item style={[styles.itemStyle,{justifyContent:'flex-start'}]} stackedLabel>
                  <Label style={styles.labelText}> Last Name</Label>
                  <Input style={styles.inputStyle}  />
                </Item>   
              </Col>
            </Grid>
             
              <Item style={[styles.itemStyle]} stackedLabel>
                <Label style={styles.labelText}>Mobile Number</Label>
                <Input  style={styles.inputStyle} />
              </Item>  
               
              <Item style={[styles.itemStyle]} stackedLabel>
                <Label style={styles.labelText}>Email Address</Label>
                <Input style={styles.inputStyle}  />
              </Item>  


             <Grid>
              <Col>
               <View style={{flex:1,width:Layout.width,marginRight:Layout.indent,marginTop:20}}>
                <Item  style={styles.datePickerItem}>
             
                <Label style={styles.labeldateText}>Date of Birth</Label>
                
                 <DatePicker
                      defaultDate={new Date(2018, 4, 4)}
                      minimumDate={new Date(2018, 1, 1)}
                      maximumDate={new Date(2020, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="(MM/DD/YYY)"
                      textStyle={{fontSize:18, color: Colors.gray,textAlign:'left',}}
                      placeHolderTextStyle={{fontSize:16, textAlign:'left', paddingLeft:0, paddingRight:10,color: "#ddd",zIndex:5,justifyContent:'flex-start' }}
                      onDateChange={this.setDate}
                      disabled={false}

                 />
           
             <Image source={imgs.calImg} style={{marginLeft:20}} style={styles.calImage} />
              </Item> 
                      
              </View> 
              </Col>
         
              <Col>
             <View style={{paddingTop:7,position:'relative',marginRight:Layout.indent}}>
              <Label style={[styles.labelText,{paddingLeft:Layout.indent, width: Layout.width}]}  >Gender</Label>
               <Item style={{height:45, borderBottomWidth:1, borderColor:Colors.primary}} >
                <Picker
                  note
                  mode="dropdown"
                  style={{ flex:1 }}
                  selectedValue={this.state.selectedG}
                  onValueChange={this.onValueChangeGender.bind(this)}
                   textStyle={{fontFamily:'Font-Medium'}}
                  style={styles.dorpDownReason}
                 
                  onValueChangeGender={this.onValueChange.bind(this)}
                  placeholderStyle={{borderWidth:10, fontFamily:'Font-Medium' }}
                  placeholderIconColor={{borderWidth:2}}
                  >
                  <Picker.Item label="Select Gender" value="0" />
                  <Picker.Item label="Male" value="key1" />
                  <Picker.Item label="Female" value="key2" />
              

                </Picker>
                   <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
               </Item>
           
              </View>
              </Col>
            </Grid>
             
             
             
          
               
             <View style={{paddingTop:10,position:'relative',marginRight:Layout.indent}}>
              <Label style={[styles.labelText,{paddingLeft:Layout.indent, width: Layout.width}]}  >Ethencity</Label>
               <Item style={{}} >
                <Picker
                  note
                  mode="dropdown"
                  style={{ flex:1 }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                  
                  >
                  <Picker.Item label="Select Ethencity" value="key0" />
                  <Picker.Item label="Ahmedabad" value="key1" />
                  <Picker.Item label="Ranip" value="key2" />
                  <Picker.Item label="Ghodasar" value="key3" />
                  <Picker.Item label="Nikol" value="key4" />

                </Picker>
                   <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
               </Item>
           
              </View>
               <Item style={{FlexDirextion:'row', justifyContent:'flex-start', marginTop:3,marginRight:Layout.indent}}>
                
                 <CheckBox
               style={styles.checkboxStyle}
               onClick={()=>{
                  this.setState({
                      isChecked:!this.state.isChecked
                  })
                }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
              isChecked={this.state.isChecked}  />

                  <Text style={styles.checkBoxStyle}>
                   Send me emails on promotions,
                    offers and services.
                  </Text>
                        
             </Item>
             
               <View style = {styles.ringBellBlock}>

                 <Switch

                 style={{color:Colors.primary,}}
                 onValueChange = {this.toggleSwitch1}
                 value = {this.state.switch1Value}/>
               <View style={{flex:0, width:50, }}>
                 {
                  this.state.switch1Value==false ?
                  <Icon name='notifications-off' type='MaterialIcons' 
                 style={{ position:'absolute',left:Layout.indent,color:Colors.lightIcon}} /> :
                 <Icon name='notifications' type='MaterialIcons' 
                 style={{ position:'absolute',left:Layout.indent,color:Colors.primary}} />
                 }

                 </View>
               
              
               <View style={{flex:1}}>
                <Text style={{fontSize:15,fontFamily:'Font-Medium',paddingTop:3}}> Ring a Bell </Text>
              </View>
               </View>

              <TouchableOpacity onPress={()=> console.log()}>
                <Button
                 full
                 primary
                 style={appStyles.btnSecontary} onPress={()=> this.props.navigation.navigate(Screens.Home.route)}>
                <Text style={[appStyles.redButton]}>Save</Text>
                </Button>
              </TouchableOpacity>
              
             
          </Form>
             

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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);