import {Colors,Layout} from '../../constants/';
export default {
  bodyText:{
    fontFamily:'Font-Medium',
    paddingLeft:15
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
   textAlign:'center'
  },
  txtDay:{
    textAlign:'center'
  },
  dateCol:{
    backgroundColor:'#adeeb8',
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
  backgroundColor:Colors.secondary,
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
    fontSize:14,
    lineHeight:22,
  
    color:Colors.white
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
  borderColor:Colors.primary,
  marginRight:Layout.indent,
  borderBottomWidth:1.2,
  marginBottom:0,
  paddingBottom:5
},
TotalList:{
  borderColor:Colors.primary,
  marginRight:Layout.indent,
  borderBottomWidth:1.2,
  marginBottom:0,
  paddingBottom:3,
  paddingTop:3
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
  fontSize:16,
  lineHeight: 25,
  fontFamily:'Font-Medium'
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
  marginTop:10

},

  checkOutBtn:{
   backgroundColor:Colors.secondary,
  borderRadius:25
  
 },
 checkOutText:{
  fontFamily:'Font-Bold',
  fontSize:20,
  lineHeight:28,
  textTransform:'capitalize'
 }

};