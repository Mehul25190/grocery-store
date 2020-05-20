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
    height:Layout.statusBarHeight
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
    backgroundColor: Colors.secondary,
    fontFamily: 'Font-Regular',
    borderRadius:20,
    marginLeft: Layout.indent,
    marginRight: Layout.indent,
    marginTop:20,
    fontSize:30,
    fontWeight:'bold'

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
    shadowOpacity: 1.0
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
    padding: Layout.indent
  },
  drawerList:{
    margin:0,
    paddingLeft:0,
    
  },
  drawerItem:{
    margin:0,
    padding:0
  },
  drawerIcon:{
    paddingRight: Layout.indent,
  },
  drawerText:{
    fontSize: 17, 
    fontWeight: '600', 
    color: Colors.lightIcon,
    paddingLeft: Layout.indent
  },
  userIconStyle:{
    fontSize:40,
    width:50
  },
  IconStyle:{
    fontSize:18,
  },
  profileName:{
    color: Colors.black,
    fontSize: 18,

  },
  userCity:{
 fontSize: 12,
  },
  userArea:{
     fontSize: 12,
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
    backgroundColor:'#f8f8f8',
    borderRadius:15
  },
  textbox:{
    marginTop:3,
    padding:5,
    color: Colors.black,
    width:100,
    paddingLeft:Layout.indent,
    paddingRight:Layout.indent,
    fontFamily: 'Font-Regular',
    fontSize:16
  },
  inputError:{
    color: Colors.red,
    top:20,
    fontSize:12
  },
  searchBar:{
    backgroundColor:'#fff',
    borderRadius:7
   
  },
  menuBar:{
   fontSize:32
  },
  searchInput:{
    color:'#AAAAAA',
    fontSize:14
  },
  userIcon:{
    paddingLeft:5
  },
  headerLeft: {
    flex: 0,
    paddingLeft:0,
    width: 40
  },
   IconRight:{
   textAlign:'center',
   alignSelf:'center',
   width:40
  },
  headerRight: {
    
    flex: 0,
    paddingLeft:5,
    width: 45,
    textAlign:'center'
  },
  headerStyle:{
    backgroundColor:Colors.primary,
    height:70,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8
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

});