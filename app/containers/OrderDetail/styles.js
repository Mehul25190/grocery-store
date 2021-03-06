import {Colors,Layout} from '../../constants/';
export default {

 orderBox:{
 	marginLeft:Layout.indent,
 	marginRight:Layout.indent,
 	marginTop:20,
 	padding:12,
 	zIndex:2,
 },
 walletRow:{
 marginBottom:15,
 
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
   marginBottom:3
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
 detailTitle:{
 	color:Colors.primary,
 	fontSize:18,
 	fontFamily:'Font-Medium'
 },
 detailTitle2:{
 	color:Colors.primary,
 	fontSize:16,
 	fontFamily:'Font-Medium'
 },
 deliveryTitle:{
 	color:Colors.black,
 	fontSize:18,
 	fontFamily:'Font-Medium',

 },
 deliveryDate:{
 	lineHeight:22,
 	paddingTop:0,
 	marginTop:0,
 	color:Colors.primary,
 	fontSize:18,
 	fontFamily:'Font-Medium'
 },
 bodyText:{
 		fontFamily:'Font-Medium'
 },
 proTitle:{
 	fontWeight:'bold',
 	fontSize:18,
 	fontFamily:'Font-Medium'
 },
  QtyPro:{
 	fontWeight:'bold',
 	fontFamily:'Font-Medium'
 },
 orderTitle:{
 	alignItems:'flex-start',
 	width:120,
 },
  orderValue:{
 	alignItems:'flex-start',
 	
 },
 orderTitleText:{
 	color:Colors.black,
 	fontSize:16,
 	fontFamily:'Font-Medium'
 },
  orderValText:{
 	color:'gray',
 	fontSize:16,
 	fontFamily:'Font-Medium'
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
};