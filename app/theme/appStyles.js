import { StyleSheet } from 'react-native';
import { Colors, Layout } from '../constants/';

export default StyleSheet.create({
  container: {
    flex: 1,
      justifyContent: 'center',
   // backgroundColor: Colors.primary,
     backgroundColor: 'transparent',
       flexDirection: 'column',
  },
  statusBar:{
    flex: 1,
    height:Layout.statusBarHeight,
    backgroundColor:'transparent'
  },
  row: {
    flex: 1,
  },
  rowXYcenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowXcenter: {
    flex: 1,
    alignItems: 'center'
  },
  rowYcenter: {
    flex: 1,
    justifyContent: 'center',
  },
  IconGreen:{
    color:Colors.primary,fontSize:20,
    padding:5,
    margin:5
  },
  fontRegular:{
    fontFamily: 'Font-Regular',
  },
  btnSecontary:{
    backgroundColor: Colors.secondary2,
    fontFamily: 'Font-Regular',
    borderRadius:20,
    marginLeft: Layout.indent,
    marginRight: Layout.indent,
    marginTop:20,
    fontSize:30,
    fontWeight:'bold',
    marginBottom:10

  },
  redButton:{
   fontSize:20,
    color:Colors.primary,
  fontFamily:'Font-Medium',
  textTransform:'capitalize'
    

  },
  content:{
    marginTop: Layout.indent-7
  },
  contentBg:{
    backgroundColor: Colors.white,
    padding: Layout.indent,
    flex:1
  },
 addBox:{
    marginLeft:Layout.indent-6,
    marginRight:Layout.indent-6,
     height:120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    shadowColor: '#000000',
    shadowOffset: {
    width: 0,
    height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation:1
},
  setLanguage: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius:0
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  introLangBtn:{
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '50%',
    marginLeft: '25%',
    marginBottom: Layout.halfIndent,
  },
  introLangBtnActive:{
    backgroundColor: Colors.secondary,
  },
  // Slider
  slide:{
    backgroundColor: Colors.primary,
    flex:1
  },
  slideTitle:{
    color: Colors.white,
    fontSize: 30,
    textAlign:'center',
  },
  slideText:{
    textAlign:'center',
    color: Colors.lightWhite
  },
  slideImage: {
    width: 300,
    height: 300,
  },
  slideIcon: {
    backgroundColor: 'transparent', 
    color: Colors.white
  },
  buttonCircle: {
    width: 40,
    height: 40,
    color: Colors.white,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDotStyle:{
    backgroundColor: Colors.secondary
  },

  menuBtn:{
    paddingLeft: 0,
    

  },
  drawerList:{
    margin:0,
    paddingLeft:0,
  

  },
 
  drawerIcon:{
    paddingRight: Layout.indent,
  },
  drawerText:{
    fontSize: 17, 
    fontFamily:'Font-Medium',
    fontWeight: '600', 
    color: Colors.primary2,
    paddingLeft: Layout.indent
  },
  drawerItem:{
     margin:0,
    padding:0,
 borderBottomWidth:1,
     borderColor:Colors.secondary,
     // backgroundColor:'#ddd'
  },
  userIconStyle:{
    fontSize:30,
    width:30,
   
  },
  IconStyle:{
    fontSize:20,
     color:Colors.primary
  },
  profileName:{
    color: Colors.black,
    fontSize: 14, fontWeight:'bold',

  },
  userCity:{
 fontSize: 12,
   fontFamily:'Font-Medium',
   lineHeight:17
  },
  userArea:{
     fontSize: 12,
     lineHeight:17,
     fontFamily:'Font-Medium'
  },
  profileEmail:{
    color: Colors.black,
    fontSize: 14,
        lineHeight:15
  },
  activeDrawerItem:{
    // backgroundColor: Colors.primaryLight
  },
  logo: {

  },
  headerLogo:{
    height: 40, 
    width: 120
  },
  loaderLogo: {
    height: 68, 
    width: 220
  },
  loginLogo: {
    marginTop: Layout.sixIndent,
    height: 68, 
    width: 220
  },
  loginMidText:{
    fontSize: 16,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
    marginTop: -Layout.doubleIndent,
    color:Colors.lightWhite
  },
  loginTitle:{
    fontSize: 30,
    color:Colors.black,
    marginLeft: Layout.indent,
    textAlign:'center',
    fontFamily: 'Font-Regular',
  },
  loginBack:{
    justifyContent:'flex-start',
   },
  loginBackIcon:{
    color: Colors.white,
 
  },
  BackIconTop:{
    flex:1,
    justifyContent:'flex-start',
    paddingTop:20
  },
  // Input
  itemInput:{
   height:45,
    backgroundColor:'transparent',
    borderRadius:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderTopWidth:0,
     borderBottomWidth:1,
    borderColor:'#DADADA',
      
  },
  textbox:{
    marginTop:3,
    padding:5,
    color: Colors.black,
    width:100,
    paddingLeft:Layout.indent,
    paddingRight:Layout.indent,
    fontFamily: 'Font-Regular',
    fontSize:16,

  },
  inputError:{
    color: Colors.red,
    top:28, position:'absolute',
    paddingRight:10, right:0,
    fontSize:12
  },
  searchBar:{
    backgroundColor:'#fff',
    borderRadius:7
   
  },
  menuBar:{
   fontSize:32,
   color:Colors.primary
  },
  searchInput:{
    color:'#AAAAAA',
    fontSize:14
  },
  userIcon:{
    paddingLeft:5
  },
  headerTitle:{
fontSize:18,
color:Colors.primary,
fontFamily:'Font-Medium'
  },
  headerLeft: {
    flex: 0,
    paddingLeft:0,
    width: 38,
  marginLeft:0,
    justifyContent:'flex-start',

  },
  StyleIconRightS:{
    paddingLeft:15,
    paddingRight:Layout.indent
  },
   IconRight:{
   textAlign:'center',
   alignSelf:'center',
   width:40,

  },
  IconsRightT:{
   textAlign:'center',
   alignSelf:'center',
   width:40,
 },
  IconsRight:{
    color:Colors.primary,
    
  },
  cartIconArea:{
  //  backgroundColor:'#ddd',
    position:'relative',
    width:35,
    height:35,
   justifyContent:'center',
   alignItems:'flex-end',
   paddingRight:3,

  },
  userIcon:{
    fontSize:24,
    paddingLeft:5,
    paddingTop:3,
    color:Colors.primary
  },
  cartIcon:{
   paddingTop:8,
   fontSize:28,
   color:Colors.primary
  },
  cartCount:{
   backgroundColor:Colors.primary,
   borderRadius:50,
   paddingLeft:3,
   paddingRight:3,
   minWidth:15,
   top:-3,
   right:-5,
   position:'absolute',
   fontSize:10,
   padding:1,
   margin:1,
   textAlign:'center',
   margin:'auto',
   color:Colors.secondary
  },
  headerRight: {
    
   flex: 0,
    paddingLeft:15,
    paddingRight:3,
    width:58,
    textAlign:'center'
  },
   headersRight: {
    // backgroundColor:'#ddd',
    justifyContent:'center',
    paddingBottom:10,
   flex: 0,
    paddingLeft:15,
    paddingRight:3,
    width:95,
    textAlign:'center'
  },
  headerStyle:{
    backgroundColor:Colors.secondary,
    height:70,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    zIndex:99
  },
  categoryStyles: {
   
    backgroundColor: '#fff',
},

  flatListStyles: {
    paddingTop:7,
    paddingBottom:5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: Layout.indent,
    paddingRight: 0
  },
  
 itemStyles: {
  paddingTop:6,
    paddingBottom:5,

    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
  marginRight:0
  },

  textItemStyles: {
  textAlign: 'center',
  fontFamily:'Font-Medium',
   fontSize:14,
  },


  /* CheckBox */
     CheckboxContainer: {
      flex: 1,
      padding: 22,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: (Platform.OS === 'ios') ? 25 : 0
    },

    showSelectedButton: {
      padding: 20,
      marginTop: 25,
      alignSelf: 'stretch',
      backgroundColor: '#5D52FF'
    },

    buttonText: {
      fontSize: 20,
      color: '#ffffff',
      textAlign: 'center',
      alignSelf: 'stretch'
    },

    selectedUI: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    checkboxTickImg: {
      width: '85%',
      height: '85%',
      tintColor: '#ffffff',
      resizeMode: 'contain'
    },

    uncheckedCheckbox: {
      flex: 1,
      backgroundColor: '#ffffff'
    },

    checkboxLabel: {
      fontSize: 18,
      paddingLeft: 15
    },
    sortText:{
      fontFamily:'Font-Medium',
      color:Colors.gray,
      fontSize:14,
      lineHeight:20,
      paddingTop:5,
      textAlign:'left',
    
    },
    sortBlock:{
    paddingLeft:Layout.indent,
      paddingRight:Layout.indent,
      zIndex:99,
     position:'absolute',
       right:15,
     paddingRight:1,
     marginRight:1,
      
      borderRadius:5, 
      elevation: (Platform.OS === 'android') ? 10 : 0, 
      
       top:45,
      backgroundColor:'#D2EAD2',
      width:100,
      height:80
    },
    spinner: {
      height: Layout.window.height * 0.85,
    },
    norecordfound: {
      flex: 1,justifyContent: 'center', alignItems: 'center'
    },
    deliveryAddress:{
      padding:10,
      height:70,
      marginLeft:Layout.indent,
       marginRight:Layout.indent ,
       marginBottom:3
    },
    deliveryAddressTitle:{
      marginLeft:12,
      padding:5,
    },
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }


    /* Slideshow*/
    
});