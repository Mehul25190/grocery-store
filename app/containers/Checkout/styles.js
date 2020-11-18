import {Colors,Layout} from '../../constants/';
export default {
  bodyText:{
    fontFamily:'Font-Medium',
    paddingLeft:10,
    fontSize:14,
    lineHeight:28
  },
  Modeltext: {
    color:'#000',
    fontSize:14,
    fontFamily:'Font-Regular',
    textAlign:'center',
    paddingHorizontal:5
   },
   closeOk:{
    marginTop:10,
    paddingVertical:10,
    backgroundColor:Colors.primary,
    justifyContent:'center',
    alignItems:'center'
   },
   closeIcon:{
  position:'absolute',
  top:15,
  right:15,
    justifyContent:'flex-end',
    alignItems:'flex-end'
   },
     smileIcon:{
    color:'#CCCC00',
    justifyContent:'center',
    alignItems:'center',
    width:50,
    fontSize:30,
    padding:10,
    alignSelf:'center'
  },
  bodyGreen:{
   color:Colors.primary,
  },
  img:{
    color:Colors.primary
  },
  btn:{
    flexDirection: 'row',
    flex:0,
    width:150
  },
  txtDate:{
   textAlign:'center',
   color:Colors.white

  },
  txtDay:{
    textAlign:'center',
    color:Colors.white
  },
  dateCol:{
    backgroundColor:'#2a656d87',
    paddingVertical:15,
    position:'relative'
  },
  activeDateCol:{
    backgroundColor:Colors.primary
  },
  activetxtDate:{
    color:Colors.white
  },
  activetxtDay:{
    color:Colors.white
  },
  clickBtn:{
    //
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  //backgroundColor:Colors.secondary,
  marginTop:5,

   height:30,

  textAlign:'center',
  justifyContent:'center',
  alignItems:'center',
  borderRadius:25,
  marginBottom:10
},
  textPayMode:{
    fontFamily:'Font-Medium',
    fontSize:15,
    lineHeight:25,
    color:Colors.primary
  },
  OrderTitle:{
     borderBottomWidth:1.3,
      marginRight:Layout.indent,
      marginLeft:Layout.indent,
       borderColor:Colors.primary,
       marginBottom:8
  },
  OrderTitleText:{
     marginTop:10,
 
  marginRight:Layout.indent,
  fontFamily:'Font-Medium',
  },
  payOptions:{
    fontSize:12,
    fontFamily:'Font-Medium',
    lineHeight:18
  },
  payOptionscard:{
    fontSize:14,
    fontFamily:'Font-Medium',
    lineHeight:18,

  },
PayMethod:{
  borderColor:Colors.primary,
  marginRight:Layout.indent,
  borderBottomWidth:1.2,
  marginBottom:5,
  paddingTop:10,
  paddingBottom:15,
  height:50
  
},
payRadio:{
  width:50,
  marginLeft:Layout.indent
},
PayMethodOther:{
    marginRight:Layout.indent,
   marginBottom:0,
  paddingBottom:10,
  height:60
},
walletBtn:{
  backgroundColor:Colors.secondary,
  paddingVertical:10,
  borderRadius:7,
  minWidth:100

},
walletBtnText:{
color:Colors.white,
fontSize:13,
paddingHorizontal:7,
fontFamily:'Font-Medium'
},
ItemList:{
  borderColor:Colors.white,
  marginRight:Layout.indent,
  borderBottomWidth:1.2,
  marginBottom:0,
  paddingBottom:5
},
TotalList:{
  borderColor:Colors.white,
  marginRight:Layout.indent,
  borderBottomWidth:1.2,
  marginBottom:0,
  paddingBottom:8,
  paddingTop:8
},

TotalBar:{
  marginRight:10,
  justifyContent:'flex-end',
  alignItems:'flex-end'
 },
 
 TotalText:{
  textAlign:'right',
  fontFamily:'Font-Medium'
 },
 title:{
  marginTop:10,
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  fontFamily:'Font-Medium',

},
 deliveryAddress:{
  padding:10,
  height:'auto',
  marginLeft:Layout.indent,
   marginRight:Layout.indent ,
   marginBottom:10
},
 
 

   paddingBox:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  marginTop:10,
  paddingLeft:Layout.indent-5,
  paddingTop:2,
  zIndex:2,
 },
 
 orderName:{
  fontSize:14,
fontFamily:'Font-Medium'
},
orderQty:{
  fontSize:14, fontWeight:'bold',
  fontFamily:'Font-Medium',
},
OrderPrice:{
  fontFamily:'Font-Medium',
  fontSize:16
},
checkOutBtnArea:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
    paddingLeft:Layout.indent,
  paddingRight:Layout.indent,
  marginTop:10,
  marginBottom:10

},

  checkOutBtn:{
   backgroundColor:Colors.secondary,
  borderRadius:25
  
 },
 checkOutText:{
  fontFamily:'Font-Medium',
  fontSize:20,
  lineHeight:28,
  color:Colors.primary,
  textTransform:'capitalize'
 }

};