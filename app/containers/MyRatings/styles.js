import {Colors,Layout} from '../../constants/';
export default {
  textAreaStyle:{
   
  
    paddingLeft:10,
    paddingRight:5,
    marginTop:Layout.indent-10,
    justifyContent:'flex-start',
   textAlignVertical:'top',
   fontFamily:'Font-Regular',
   color:Colors.gray,
   
   fontSize:14,
   
  },
  textArea:{
    height:150,
    marginLeft:0,
    marginRight:0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
    width: 0,
    height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 2.0
  },
  writeReview:{
    marginLeft:Layout.indent,
marginRight:Layout.indent,
paddingLeft:Layout.indent,
paddingRight:Layout.indent,
marginTop:Layout.indent-5,

  },
  starBox:{
    padding:10,
    height:'auto',
    marginBottom:22
  },
  rateText:{
    fontFamily:'Font-Regular'
  },
rateItems:{
marginLeft:Layout.indent,
marginRight:Layout.indent,
paddingLeft:Layout.indent,
paddingRight:Layout.indent,
marginTop:Layout.indent-5,
borderBottomWidth:1,
borderColor:Colors.primary
},
 paddingBox:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  marginTop:10,
  paddingLeft:Layout.indent-5,
  paddingTop:15,
  paddingBottom:15,
  zIndex:2,
 },
 walletRow:{
 marginBottom:15,
 
 },
 amulCol:{
  marginLeft:Layout.indent,
  
 },
 AmuText:{
  color:Colors.gray,
  fontFamily:'Font-Medium',
  fontSize:14,
  lineHeight:20
 },
 
 AmuTextTitle:{
  fontSize:16,
  lineHeight:20,
  color:Colors.black
 },
 amulInfo:{
  // backgroundColor:'#ddd'
 },
 
 submitBtnArea:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  marginBottom:40
 },

 submitBtn:{
  
  borderRadius:25,
  backgroundColor:Colors.secondary,
  padding:12,
  
 },
 submitText:{
  fontFamily:'Font-Medium',
  fontSize:20,
  textTransform:'capitalize',
color:Colors.primary
 },
 amulMoti:{
  width:100,
  height:'auto',
  flex:1,
  resizeMode:'contain'
 },

cancelBtnTxt:{
fontFamily:'Font-Medium',
textTransform:'capitalize',
fontSize:20,
color:Colors.primary

}
 

};