import React from 'react'
import { Icon } from 'native-base';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Strings from './Strings';

export default {
  Title: 'Grocery',
  SignInStack : {
    route: 'SignInStack'
  }, 
  DrawerStack : {
    route: 'DrawerStack'
  },
  Home : {
    route: 'Home',
    icon:'home',

    label: Strings.home,
  },
  MyOrder : {
    route: 'MyOrder',
    icon: 'ios-timer',
    type: 'Ionicons',
    label: Strings.myorder,
  },
  MyWallet:{
    route: 'MyWallet',
    icon: 'wallet', 
    type: 'AntDesign',
    label: Strings.mywallet,
  },
  MyPayments:{
    route:'MyPayments',
    icon:'creditcard',
    type: 'AntDesign',
    label: Strings.mypayments,
  },
  MyRatings:{
    route:'MyRatings',
    icon:'playlist-star',
     type: 'MaterialCommunityIcons',
    label: Strings.myratings,
  },
  MyNotification:{
    route:'MyNotification',
    icon:'notifications-none',
    type:'MaterialIcons',
    label: Strings.notification,
  },
   MyAddress:{
    route:'MyAddress',
    icon:'location',
    type:'EvilIcons',
    label: Strings.address,
  },
   Subscription:{
    route:'Subscription',
    icon:'heart',
    type: 'Feather',
    label: Strings.subscription,
  },
  ProductList:{
    route: 'ProductList',
  },
  Settings : {
    route: 'Settings',
    icon:'settings',
    label: Strings.settings,
  },

  SignOutStack : {
    route: 'SignOutStack'
  }, 
  SignIn : {
    route: 'SignIn'
  }, 
   SignInEmail : {
    route: 'SignInEmail'
  }, 
  SignInMobile : {
    route: 'SignInMobile'
  }, 
  Verification : {
    route: 'Verification'
  },
  SignUp : {
    route: 'SignUp'
  }, 
  ForgotPassword : {
    route: 'ForgotPassword'
  }, 
};