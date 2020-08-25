import {Colors,Layout} from '../../constants/';
export default {
  
  pauseBtn:{
     height:30,
  backgroundColor:'#fff',
  elevation: 0 
  },
  pauseIcon:{
      fontSize:18,
    position:'absolute',
    left:0,
    color:Colors.primary,
 top:1
  },
  deleteIcon:{
  top:1,
    fontSize:18,
    position:'absolute',
    left:2,
    color:Colors.primary
  },
  deleteBtn:{
    paddingLeft:5,
    textAlign:'center',
       elevation: 0,
    backgroundColor:'transparent',
    boxShadow:'none',
    border:'none',
      height:30,
  },
  modifyIcon:{

    fontSize:18,
    position:'absolute',
    left:0,
    top:1
    
  },
  btnRow:{
    marginLeft:Layout.indent,
    marginRight:Layout.indent,
    paddingLeft:0
  },
  btnText:{

    paddingLeft:Layout.indent,
    marginLeft:15,
    fontFamily:'Font-Medium'
  },
  BtnCol:{
    marginTop:10
  },
  modifyBtn:{
    height:30,
    borderRadius:50,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:Colors.primary
  },
topInstruction:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  backgroundColor:Colors.primary,
  marginTop:10,
  marginBottom:5,
  borderRadius:20
},
instruction:{
color:Colors.white,
textAlign:'center',
paddingTop:5,
fontFamily:'Font-Medium',
fontSize:14
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
  lineHeight:20
 },

 AmuTextTitle:{
  fontSize:18,
  lineHeight:20,
  color:Colors.black
 },
 amulInfo:{
  // backgroundColor:'#ddd'
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
 
 proPrice:{
  color:'gray'
 },
 orderTitleText:{
  color:Colors.gray,
  fontSize:16,
  fontFamily:'Font-Medium'
 },
dailyTitle:{
  alignItems:'flex-start'
},
orderTitle:{
  width:100
},
dayText:{
color:Colors.black,
  fontSize:16,
  fontFamily:'Font-Medium'
}



};