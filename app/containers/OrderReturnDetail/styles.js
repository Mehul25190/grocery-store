import {Colors,Layout} from '../../constants/';
export default {
  reasonView:{

 width: Layout.width,
  marginTop: 10,
  marginRight:Layout.indent-5,
  marginLeft:Layout.indent-5,
  flex:1,
  borderRadius: 10,
  paddingLeft:10,
   backgroundColor:Colors.primary,
   color:Colors.white,
     fontFamily:'Font-Medium',
     marginBottom:10,
     shadowColor: "#000",
     shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 3,
  },
  dorpDownReason: {
    borderRadius:50,zIndex:50,
   flex:1,
   height:45,
   color:Colors.white,
   fontFamily:'Font-Medium'
   },

  DownArrow:{
    position:'absolute',
    right:10,
    width:18,
    height:15,
    top:15,zIndex:99
  },
  title:{
    marginLeft:Layout.indent-5,
    paddingTop:10,
    paddingBottom:0,
    fontFamily:'Font-Medium'
  },
orderId:{
  fontFamily:'Font-Medium',
  fontSize:16,
},
Qty:{
fontFamily:'Font-Medium'
},
dateTime:{
  fontFamily:'Font-Medium',
  fontSize:14,
  lineHeight:16
},
orderBox:{
  
 
  marginTop:20,
  padding:12,
  zIndex:2,
},
orderInfo:{
  marginRight:Layout.indent-5,
  marginLeft:Layout.indent-5,
  paddingBottom:15,
  borderColor:Colors.primary,
  borderBottomWidth:1,

},
 
 returnBtn:{
width:50,
height:28,
backgroundColor:'transparent',
borderColor:Colors.primary,
borderWidth:1,
borderRadius:5,
alignItems:'flex-end',
elevation:0,
 textAlign:'center',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
 },
 btnText:{
  color:Colors.primary,
  fontFamily:'Font-Regular',
  fontSize:11,
  textTransform:'capitalize',
  paddingLeft:1,
  paddingRight:1,
   textAlign:'center',
    flex:1,
    lineHeight:15,
     textAlign:'center',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',

 },
 RigView:{
alignItems:'flex-end'
 },

 proTitle:{
 
 	fontSize:16,
 	fontFamily:'Font-Medium'
 },
  proTime:{
  fontSize:14,
 	fontFamily:'Font-Medium'
 },


  
  proImage:{
  textAlign:'left',
  width:50,
  height:50,
  resizeMode:'contain',

  },
  qtyInput:{
    borderWidth:1,
    borderColor:Colors.primary,
    borderRadius:5,
    width:50,
    paddingTop:5,
    textAlign:'center',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    paddingBottom:5,
    color:Colors.black
  },
  camera:{
    color:Colors.primary,
    fontSize:22
  },
  qtyCol:{
    marginLeft:5,
    marginRight:5,
    position:'relative',
  
    height:28
  },
  RigView:{


  },
  bodyText:{
    fontFamily:'Font-Medium',
    justifyContent:'center',
   borderBottomColor:Colors.primary,
 
    height:80
 },
  ListLeft:{
  padding:10

  },
   ListItems:{
  marginLeft:0,
  flex:1,
  justifyContent:'center',
  alignItems:'center',
    marginLeft:0,
  marginBottom:5,
  paddingBottom:3,
  marginTop:10
  },
  ListRight:{
   alignItems:'center',
    height:62,
   borderBottomColor:Colors.primary,
   paddingRight:0
  },
  qtyText:{
    position:'absolute',
    top:-25,
    textAlign:'center',
    right:13,
    fontFamily:'Font-Regular',
    color:Colors.black,
    fontSize:14
  },
  doneBtnArea:{
  marginBottom:20
  },
  doneBtn:{
   
    marginLeft:Layout.indent-5,
    marginRight:Layout.indent-5,
    backgroundColor:Colors.secondary,
    borderRadius:25
  },
  btnTextDone:{
  fontFamily:'Font-Bold',
  fontSize:20
  }
};