import {Colors,Layout} from '../../constants/';
export default {
  
  heartoSection:{
alignItems:'center',
textAlign:'center',
justyfyContent:'center',


  },
  hearto:{
color:'red',
fontSize:30,
textAlign:'center'
},
 brandAndVeg:{
    flex: 1,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'row',

  },
 vegImage:{
  width:12,
   height:12,
   resizeMode:'contain',
   },
  variantImg:{
     fontSize:50,
  },
  similarImges:{
   width:100,
  alignSelf:'center',
  height:100,
  alignItems:'center',
  resizeMode:'contain',
  justifyContent:'center',
  flex:1
  },
  similarPrice:{
fontFamily:'Font-Medium',
  fontSize:16,
  },
  similarTitle:{
 fontFamily:'Font-Medium',
  fontSize:15,
  },
  similarWeight:{
 fontFamily:'Font-Medium',
  fontSize:13,
  },
variantBtnActive:{
  width:70,
  flex:1,
  justyfyContent:'center',
  alignItems:'center',
  borderRadius:8,
  backgroundColor:Colors.primary,
  borderColor:Colors.secondary,
  margin:5
},
variantTextActive:{
color:Colors.secondary,
padding:5,

},
variantBtnDeactive:{
  width:70,
  flex:1,
  borderRadius:8,
  justyfyContent:'center',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  alignItems:'center',
  backgroundColor:Colors.secondary,
  borderColor:Colors.secondary,
  margin:5
},
 okayBtnArea:{
  marginTop:3,
  marginBottom:5,
  paddingTop:20
  },
  doneBtn:{
   
    marginLeft:Layout.indent,
    marginRight:Layout.indent,
    backgroundColor:Colors.secondary,
    borderRadius:25
  },
  btnTextDone:{
  fontFamily:'Font-Medium',
  fontSize:20,
  color:Colors.primary
  },
  backgroundImage: {
    height: "100%",
    width: Layout.width,
    backgroundColor:'#ddd'
  },
  circleDiv: {
    position: "absolute",
    bottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 10
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#fff"
  },
  priceText:{
    fontFamily:'Font-Medium',
    fontSize:25,
    color:Colors.gray,
    lineHeight:30,
    justifyContent:'center',
    paddingTop:10
  },
  pricePart:{
    marginRight:Layout.indent,
    marginLeft:Layout.indent-5,
    marginBottom:0,
    justifyContent:'center',
    flex:1
  },
  cartPart:{
    width:70,
    marginRight:Layout.indent,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    textAlign:'center'
  },
  bottomCart:{
    marginTop:0,
    color:Colors.white,
    backgroundColor:Colors.primary,
    alignSelf:'center',
    alignItems:'center',
    textAlign:'center',
    padding:12,
    borderRadius:25
  },
   DownArrow:{
    position:'absolute',
    right:10,
    width:18,
    height:15,
    top:18,zIndex:99
  },
reasonView:{
  width:140,
  marginTop: 10,
  marginRight:Layout.indent-5,
  marginLeft:Layout.indent-5,
  flex:1, alignItems:'flex-end',
  borderRadius: 10,
  paddingLeft:10,
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
     elevation: 0,
  },
 paddingBox:{
  marginLeft:Layout.indent-10,
  marginRight:Layout.indent,
  marginTop:10,
  marginBottom:20,
  paddingLeft:Layout.indent-5,
  paddingTop:12,
  zIndex:2,

 },

 amulCol:{
  backgroundColor:'#ddd',
 justifyContent:'flex-start',
 alignItems:'flex-start',
 flex:1,
 },
 AmuText:{
  color:Colors.gray,
  fontFamily:'Font-Medium',
  fontSize:14,
  lineHeight:16
 },
 deliveryAddress:{
  padding:10,
  height:'auto',
  marginLeft:Layout.indent,
   marginRight:Layout.indent ,
   marginBottom:3
},
 AmuTextTitle:{
  fontSize:16,
  lineHeight:20,
  color:Colors.black
 },
 outofstock: { fontSize:14, color:'#ff0000', textAlign:'right', paddingTop:5},
 amulInfo:{
  // backgroundColor:'#ddd'
 },
 payText:{
  color:Colors.white,
  fontFamily:'Font-Medium',
  fontSize:15,
  lineHeight:18
 },
 
payTextNow:{
color:Colors.primary,
fontFamily:'Font-Medium',
textTransform:'capitalize',
fontSize:20
},

paynowBtn:{
  backgroundColor:Colors.white,
  borderRadius:50,
  paddingTop:2,
  paddingBottom:2,
 
},
 payBtn:{
  marginTop:15,
  borderRadius:25,
  backgroundColor:Colors.secondary,
  padding:12,
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
 
 },
 amulMoti:{
  width:100,
  alignSelf:'center',
  height:100,
  alignItems:'center',
  resizeMode:'contain',
  justifyContent:'center',
  flex:1
 },
 secondRow:{
  flex:1,
  padding:10,
   alignItems:'center',

  justifyContent:'center'
 },

 QtyBox:{
  alignItems:'flex-end',
  justifyContent:'flex-start',
 paddingTop:0,
 marginTop:0
 },

firstRow:{
  padding:0,
  margin:0,

},
trackBox:{
  height:'auto',
  marginTop:-4,
  borderTopLeftRadius:0,
  borderTopRightRadius:0,
  marginLeft:Layout.indent+5,
  marginRight:Layout.indent+5,
  padding:10,
  zIndex:1
},

 proPrice:{
  color:'gray'
 },
 orderTitleText:{
  color:Colors.gray,
  fontSize:16,
  fontFamily:'Font-Medium'
 },
orderTitle:{
  padding:0,
  margin:0
},
bodyText:{
  fontFamily:'Font-Medium',
  paddingLeft:15
},
bodyNote:{
  paddingLeft:15,
  color:Colors.primary,
  lineHeight:12
},
bodyGreen:{
  color:Colors.primary,
},
title:{
  marginTop:15,
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  fontFamily:'Font-Medium',
  fontSize:18

},
checkboxStyle:{
borderColor:Colors.primary, width:32, borderRadius:5, borderWidth:2
},
subRs:{
  fontFamily:'Font-Medium',
  color:Colors.primary
},
currency:{
  fontFamily:'Roboto',
  color:Colors.primary
},

addressText:{
  fontFamily:'Font-Medium',
  color:Colors.black,
  lineHeight:18,
  paddingLeft:10
},
addressIcon:{
  fontSize:22
},
buyButton:{
  // backgroundColor:'#F8BB1B',
   justifyContent: 'center',
   alignItems: 'center',
   textAlign:'center',
   alignSelf:'center',
   paddingLeft:0,
   paddingRight:0,
   width:99,
   height:35,
},

};