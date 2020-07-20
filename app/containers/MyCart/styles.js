import {Colors,Layout} from '../../constants/';
export default {
clickBtn:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  backgroundColor:Colors.primary,
  marginTop:Layout.indent,
 
  height:35,
  paddingBottom:3,
  textAlign:'center',
  justifyContent:'center',
  alignItems:'center',
  borderRadius:25,
  marginBottom:5
},
  textPayMode:{
    fontFamily:'Font-Medium',
    fontSize:14,
    lineHeight:22,
  
    color:Colors.white
  },
  pointer:{

   fontSize:20,
   
   color:'#fff',
   margin:0,
   padding:0,
   fontFamily:'Font-Bold'
  },
  totalAmount:{
    //backgroundColor:Colors.primary,
    borderRadius:25,
    paddingLeft:Layout.indent,
    paddingRight:Layout.indent
  },
  totalText:{
    color:Colors.black,
    fontFamily:'Font-Medium',
    fontSize:16
  },
Amount:{
  fontSize:18,
  color:Colors.black,
  fontFamily:'Font-Medium'
},
subscibed:{
backgroundColor:Colors.secondary,
borderRadius:5,
paddingHorizontal:10,
height:30,
justifyContent:'center',
textAlign:'center',
marginBottom:10
},
textSubscribe:{
fontSize:14,
fontFamily:'Font-Medium',
color:Colors.white
},
footerCol:{
  justifyContent:'center',
  borderRightWidth:1,
  alignItems:'center',
  paddingLeft:6,
  paddingRight:6,
  borderColor:Colors.gray
  
},
footerTitle:{
  color:Colors.primary,
  fontFamily:'Font-Medium'
 },

  BottomView:{
    
    backgroundColor:Colors.white,
    paddingLeft:Layout.indent,
    paddingRight:Layout.indent,
    height:70,
    borderTopWidth:1,
    borderColor:'#DCDCDC',
   paddingTop:10,
   paddingBottom:10,
   justifyContent:'center'
   
},
footerAmount:{
  color:Colors.primary,
  textAlign:'center',
  fontFamily:'Font-Medium',
},
textSummary:{
  textAlign:'center',
    fontFamily:'Font-Medium',
    color:Colors.primary,
    fontSize:16,
    lineHeight:18,
    paddingVertical:7
},
orderSummary:{
  //backgroundColor:Colors.secondary,
  borderRadius:5
},
 title:{
  
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  fontFamily:'Font-Medium',

},
 deliveryAddress:{
   top:10,
  padding:10,
  height:'auto',
  marginLeft:Layout.indent,
   marginRight:Layout.indent ,
   marginBottom:3
},
 
  ListItems:{
  	fontFamily:'Font-Medium',
   borderColor:Colors.primary,
   paddingLeft:0,
    paddingTop:5,
    paddingBottom:5,
    marginLeft:Layout.indent-7,
    marginRight:Layout.indent-7,
    paddingRight:Layout.indent-7
   },
     ListLeft:{
   
    flex: 0,
    paddingLeft:0,
    width: 80,
    paddingLeft:0,
    alignItems: 'flex-start',
    marginLeft:0
     },
     proImage:{
    textAlign:'left',
    marginLeft:0,
    width:80,
    height:80,
    resizeMode:'contain',
   },
   ListRight:{
     	 	justifyContent: 'flex-start',
        textAlign:'right'
   },
   txtDate:{
    marginLeft:Layout.indent,
    marginRight:Layout.indent,
    fontFamily:'Font-Medium',
    fontSize:14,
    lineHeight:20
   },
   paddingBox:{
    marginLeft:Layout.indent,
    marginRight:Layout.indent,
    marginTop:10,
    paddingLeft:Layout.indent-5,
    paddingTop:2,
    zIndex:2,
   },
  firstRow:{
  padding:0,
  margin:0,
  borderBottomWidth:1,
  borderColor:Colors.primary
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
QtyBox:{
  alignItems:'flex-end',
  padding:7,
  justifyContent:'flex-end'
 },
 amulMoti:{
  width:80,
  height:'auto',
  flex:1,
  resizeMode:'contain'
 },
  secondRow:{
  
  paddingBottom:20,
  marginTop:10,
  marginBottom:5,
  borderBottomWidth:1,
  borderColor:Colors.primary,
  
 },
  amulCol:{
  width:100
 },
 AmuText:{
  color:Colors.gray,
  fontFamily:'Font-Medium',
  fontSize:14,
  lineHeight:16
 },
 AmuTextTitle:{
  fontSize:16,
  lineHeight:20,
  color:Colors.black
 },
  bodyText:{
  color:Colors.white,
  fontFamily:'Font-Regular',
  fontSize:15,
  lineHeight:20
 },
 bottomCart:{
  color:Colors.white,
  fontSize:25,
  marginRight:5
 },
 checkOutBtn:{
  backgroundColor:Colors.secondary,
  borderRadius:25,
  height:28,
 
 },
 checkOutText:{
  fontFamily:'Font-Medium'
 },
 proPrice:{
    marginLeft:1,
    fontSize:14,
    //textDecoration:'none',
    // backgroundColor:'#ddd',
    flex:0,
    fontFamily:'Font-Medium'
   },
   proPriceStrike:{
    marginLeft:1,
    fontFamily:'Font-Medium',
    flex:0,
    // backgroundColor:'#333',
    fontSize:14,
    textDecorationLine:'line-through'
   }

};