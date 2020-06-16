import React from "react";
import { Text, Image } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import appStyles from '../theme/appStyles';
import imgs from '../assets/images';

class DeliveryAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setDeliveryAddress:[],
           // USERID:1,
        }
    }

    componentDidMount() {
       
        this.getDeliveryAddress();  
         
    }

    //get Delivery address
    getDeliveryAddress(){

        //alert(this.props.user.userId);  
        this.props.showDeliveryAddress(this.props.user.userId).then (res => {

        console.log(res.status); 
        if(res.status == "success"){
            this.setState({ setDeliveryAddress:res.data.userAddress[0]});
                //console.log("donw");
                //console.log(res.data.userAddress[0].buildingName);
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


  render() {
    return (
        <Card style={[appStyles.addBox, { height: 'auto', position: 'relative' }]}>
              <Grid>
                <Row style={{}}>
                  <Col style={{ justifyContent: 'flex-start' }}>
                    <View>
                      <Text style={{ color: Colors.primary, fontFamily: 'Font-Medium', padding: 10 }}>Delivery Address
                           </Text>
                    </View>
                  </Col>
                  <Col style={{ justifyContent: 'flex-end' }}>
                      <TouchableOpacity style={styles.EditIconStyle} onPress={() => this.editAddress()}>
                        <Icon name='edit' type='MaterialIcons' style={[appStyles.IconGreen, { paddingRight: 15 }]} />

                      </TouchableOpacity>

                    </Col>

                </Row>
                <Row>

                  <View>
                    <Text style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10, fontFamily: 'Font-Medium', fontSize: 14 }}>
                      {this.state.setDeliveryAddress.aptNo},{this.state.setDeliveryAddress.buildingName}
                    </Text>
                    <Text style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10, fontFamily: 'Font-Medium', fontSize: 14 }}>  
                      {this.state.setDeliveryAddress.areaName}, {this.state.setDeliveryAddress.zipcode}, {this.state.setDeliveryAddress.cityName}
                    </Text> 
                    
                  </View>
                </Row>

              </Grid>
            </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showDeliveryAddress: (userid) => dispatch(userActions.getDeviveryAddress({userId:userid})),
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);