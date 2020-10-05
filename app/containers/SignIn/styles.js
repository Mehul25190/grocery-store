import {Colors,Layout} from '../../constants/';
export default {
  backGroundstyle:{
    width: Layout.window.width,
    height: Layout.window.height,
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'flex-end',
   backgroundColor: 'transparent',
   flexDirection: 'column',
  },
  backGroundstyleEmail:{
   width: Layout.window.width,
   height: Layout.window.height,
   flex: 1,
   justifyContent: 'center',
   backgroundColor: 'transparent',
   flexDirection: 'column',

  },
  itemStyle:{
    marginLeft:0
  },
  forgotBox:{
    flex:2,
    justifyContent:'flex-start'
  },
  loginBox: {

    marginTop: Layout.indent,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: Layout.indent
   
  },
  signupBox:{
    marginBottom:50,
    flex:2.5,
    justifyContent:'flex-start',
    
  },
  signBox:{
   marginBottom:50
  },
  signFormBox:{
    marginBottom:3,
    paddingBottom:3,
    marginRight:Layout.indent
  },
  loginBoxEmail:{
    
    flex:3,
    justifyContent:'flex-start'
  },
  verificationBox:{
    marginLeft: 0,
    marginRight: 0,
    flex:4.5,
    justifyContent:'flex-start'
  },
  linkTextBtn:{
    marginTop:Layout.indent
  },
  linkText:{
    textTransform:'capitalize',
    color: 'grey',
    fontSize:16,
    fontFamily: 'Font-Regular',
    marginBottom:20,
  },
  linkTextEmail:{
    textTransform:'capitalize',
    color:'#333333',
    fontSize:14,
    lineHeight:20,
    paddingVertacal:10,
    textAlign:'right',
    paddingRight:0,
    fontFamily: 'Font-Regular',
    
  marginRight:Layout.indent
    
  },
  linkTextLogin:{
  textTransform:'capitalize',
    color: Colors.primary2,
    fontSize:16,
    fontFamily: 'Font-Regular',
    paddingBottom:20,
    paddingLeft:Layout.indent+5,
    paddingVertical:10
  },
  linkTextSignup:{
    textTransform:'capitalize',
    color: Colors.primary2,
    fontSize:14,
    lineHeight:20,
    
    fontFamily: 'Font-Regular',
  
    paddingLeft:5,
      paddingVertical:10
  },
  loginForm:{
    marginTop: Layout.doubleIndent,
    paddingRight:Layout.indent,
    backgroundColor:'#fff'

  },
  label:{
    fontSize:16,
    paddingLeft:Layout.indent,
    marginBottom:7,
    marginTop:8,
    fontWeight:'bold',
    color:'#24292e'
  },
  formStyle:{
    // backgroundColor:'#333'
  },
  SignInbtn:{
    fontSize:18,
    lineHeight:33,
    textTransform:'capitalize',
    color:'#ffffff',
    fontFamily:'Font-Regular'
   },


  btnSecontary:{
    backgroundColor:'#333333',
    fontFamily: 'Font-Regular',
    borderRadius:20,
    marginLeft: Layout.indent,
    marginRight: Layout.indent,
    marginTop:20,
    fontSize:30,
    fontWeight:'bold',
    marginBottom:10

  },
     
  loginWith:{
    marginLeft:Layout.indent,
    marginRight:Layout.indent,
    marginTop:20
  },
  loginWithMob:{

  },
  loginWithText:{
    color:'#333333',
    padding:0,
    fontSize:18,
    fontFamily:'Font-Medium',
    textAlign:'center'
  },
  hairlineleft: {
  backgroundColor: '#B3B3B3',
  height: 2,
  width: Layout.width,
 marginTop:10,
},

loginButtonBelowText1: {
  bottom:18,
  fontSize: 14,
  margin:10,
  zIndex: 1,
  color: '#787878',

 textAlign:'center',
  width:Layout.width,
   justifyContent:'center',
  height:8,
  alignItems:'center'
  
},
orText:{
  padding:10,
  backgroundColor:'#fff',
  color:'#787878',
  fontSize:22,
  fontWeight:'bold'
},
  
 

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
   backgroundColor:'#DFDFDF',
   borderRadius:7,
   color:'#333',
   fontSize:18,
   marginTop:-60,
   width: 50,
    height: 50,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.primary
  },
  verifyTitle:{
  fontFamily: 'Roboto',
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center'
  },
  verifySubTitle:{
    marginTop:20,
    fontSize:17,
    color:'#AAAAAA',
    textAlign:'center',
    fontWeight:'bold',
    letterSpacing:1
  }
};