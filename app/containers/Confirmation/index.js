import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';

import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers } from '../../components';

import {
  Container,
  Content,
  
  Button,
  Text,
 
} from 'native-base';


import appStyles from '../../theme/appStyles';
import styles from './styles';



class Confirmation extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       selected:'key0',

    };

  }
 
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    };

  
  
  render(){
    let pageItem;
   const { navigation } = this.props;
    const getPage = navigation.getParam('item');
 

    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              bgColor='transparent'
              Title='Confirmation'
             />
      <Content enableAndroid>
   
       <ScrollView style={styles.thanksAre}>
       {getPage=='CancelOrder' &&
        (<View>
           <Text style={styles.thanksTitle}>Thank You for your response.</Text>
            <Text style={styles.thanksText}>We have received your request &</Text>
            <Text style={styles.thanksText}>soon you will get response.</Text>
        </View>)}

       {getPage=='OrderReturnDetail' &&
       (<View>
           <Text style={styles.thanksTitle}>Thank You for your response.</Text>
            <Text style={styles.thanksText}>We have received your request &</Text>
            <Text style={styles.thanksText}>soon you will get the refund.</Text>
        </View>)}
        

         {getPage=='Confirm' &&
           ( <View>
                <Text style={[styles.thanksTitle,{textAlign:'center'}]}>Thank You for giving Ratings.</Text>
            </View>)}

        {getPage=='DeleteSubscribe' &&
           (<View style={{marginRight:Layout.indent}}>
                <Text style={styles.msgTitleTxt}>
                Are You Sure?
                </Text>
            <Text style={styles.msgText}>
            Your order has been canceled once you click button.
            </Text>
            </View>) }

         <View style={styles.okayBtnArea}>
          <Button priamary full style={styles.doneBtn}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate(Screens.Home.route)}>
        <Text style={styles.btnTextDone}>Okay</Text>
        </TouchableOpacity>
        </Button>
       </View>
        </ScrollView>
      
     
         
      
        </Content> 
        
       
        
      </Container>
     
    );
  }
}

// Exports
export default Confirmation;