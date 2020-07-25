import {Colors,Layout} from '../../constants/';
export default {
   img:{
       color:Colors.primary
    },
    btn:{
        flexDirection: 'row',
        flex:0,
       width:150
    },
calImage:{
  width: 30 ,
  resizeMode:'contain',
  height:30
},
HoriLine:{

  backgroundColor:Colors.primary,
   marginLeft:Layout.indent,
   marginRight:Layout.indent,
   height:1,
   marginTop:5,
   marginBottom:5,
},
 reasonView:{
      width: Layout.width,
      marginTop: 10,
      marginRight:Layout.indent-5,
      marginLeft:Layout.indent-5,
      flex:1,
      borderRadius: 10,
      paddingLeft:10,
      backgroundColor:Colors.white,
      color:Colors.white,
      fontFamily:'Font-Medium',
      marginBottom:10,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity:2.2,
    shadowRadius: 4,
    elevation: 2,
  },
   DownArrow:{
    position:'absolute',
    right:10,
    width:18,
    height:15,
    top:15,zIndex:99
  },
   dorpDownReason: {
    borderRadius:50,zIndex:50,
   flex:1,
   height:45,
   color:Colors.gray,
   fontFamily:'Font-Medium'
   },
 paddingBox:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  marginTop:10,
  paddingLeft:Layout.indent-5,
  paddingTop:2,
  zIndex:2,
 },
 walletRow:{
 marginBottom:15,
 
 },
 amulCol:{
  width:120
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
 amulInfo:{
  // backgroundColor:'#ddd'
 },
 payText:{
  color:Colors.primary,
  fontFamily:'Font-Medium',
  fontSize:15,
  lineHeight:18
 },
 datelabel:{
  paddingBottom:10,
  bottom:15,
  position:'absolute',
  fontFamily:'Font-Medium',
  color:Colors.black,
  fontSize:16
 },
payTextNow:{
color:Colors.primary,
fontFamily:'Font-Medium',
textTransform:'capitalize',
fontSize:16

},

paynowBtn:{
backgroundColor:Colors.white,
borderRadius:50,
paddingTop:2,
paddingBottom:2,
height:35
},
 payBtn:{
  marginTop:5,
  borderRadius:8,
  backgroundColor:Colors.secondary,
  padding:12,
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  marginBottom:10
 },
 secondRow:{
  // backgroundColor:'#ddd',
  padding:10
 },
 QtyBox:{
  alignItems:'flex-end',
  padding:7
 },
 amulMoti:{
  width:100,
  height:'auto',
  flex:1,
  resizeMode:'contain'
 },
 firstRow:{
  padding:0,
  margin:0,
  borderBottomWidth:1,
  borderColor:Colors.primary
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
}

};