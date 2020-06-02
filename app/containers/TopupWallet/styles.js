import {Colors,Layout} from '../../constants/';
export default {
  redButton:{
fontFamily:'Font-Bold',
fontSize:22,
textTransform:'capitalize',
paddingTop:5
  },

 topPart:{
  backgroundColor:'red',
  height:100
 },
 bottomBtn:{
  backgroundColor:'#333',
 },
 walletBtn:{
  fontFamily:'Font-Medium',
 },
 cardBox:{
 	marginLeft:Layout.indent,
 	marginRight:Layout.indent,
  marginTop:15,
  paddingLeft:0
 },
   cardRow:{
   marginBottom:15,
   marginTop:10
   },
   amountLabel:{
    fontFamily:'Font-Medium',
    fontSize:16,
    marginTop:5,

   },
 cardLabel:{
  
 	marginLeft:0,
  paddingLeft:0,
  
 
 },
 cardText:{
  paddingLeft:0,
  marginLeft:0,
  lineHeight:25,
  paddingTop:5,
  color:Colors.primary,
  fontFamily:'Font-Medium',
  fontSize:15
 },
 checkCol:{
  marginRight:Layout.indent,
  width:50,
  paddingRight:Layout.indent-5,
  alignItems:'flex-end',
	justifyContent:'center'
 },

};