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

    label: 'Home',
  },
  MyOrder : {
    route: 'MyOrder',
    icon: 'ios-timer',
    type: 'Ionicons',
    label: 'My Orders',
  },
  MyWallet:{
    route: 'MyWallet',
    icon: 'wallet', 
    type: 'AntDesign',
    label: 'My Wallet',
  },
  MyPayments:{
    route:'MyPayments',
    icon:'creditcard',
    type: 'AntDesign',
    label: 'My Payment',
  },
  MyRatings:{
    route:'MyRatings',
    icon:'playlist-star',
     type: 'MaterialCommunityIcons',
    label: 'My Ratings & Reviews',
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
    label: 'My Delivery Address',
  },
   Subscription:{
    route:'Subscription',
    icon:'heart',
    type: 'Feather',
    label: 'My Subscription',
  },
  ProductDetail:{
    route: 'ProductDetail',
  },
  SubscribeSuccess: {
    route: 'SubscribeSuccess',
  },
  OrderSuccess: {
    route: 'OrderSuccess',
  },
  Checkout: {
    route: 'Checkout',
  },
  DeleteSubscribe: {
    route: 'DeleteSubscribe',
  },
  Confirmation:{
    route: 'Confirmation',
  },
  OrderReturnDetail:{
    route: 'OrderReturnDetail',
  },
  OrderReturn:{
    route: 'OrderReturn',
  },
  SubscribeDetail:{
    route: 'SubscribeDetail',
  },
  MyCart:{
    route: 'MyCart',
  },
  Profile:{
    route: 'Profile',
  },
  CancelOrder:{
    route: 'CancelOrder',
  },
  SubscribeOrder:{
    route: 'SubscribeOrder',
  },
  OrderDetail:{
    route: 'OrderDetail'
  },
   TopupWallet:{
    route: 'TopupWallet',
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