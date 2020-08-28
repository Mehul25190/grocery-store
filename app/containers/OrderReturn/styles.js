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
 	color:'gray',
  textAlign:'right'
 },
 detailTitle:{
 	color:Colors.primary,
 	fontSize:18,
 	fontFamily:'Font-Medium'
 },
 detailTitle2:{
 	color:Colors.primary,
 	fontSize:16,
 	fontFamily:'Font-Medium',
  paddingLeft:7
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
 	fontSize:16,
 	fontFamily:'Font-Medium'
 },
 bodyText:{
 		fontFamily:'Font-Medium'
 },
 proTitle:{
 lineHeight:20,
 	fontSize:16,
 	fontFamily:'Font-Regular'
 },
  QtyPro:{
 	
 	fontFamily:'Font-Regular'
 },
 orderTitle:{
 	alignItems:'flex-start',
 	width:135,
 },
  orderValue:{
 	alignItems:'flex-start',
 	
 },
writereviews: {alignItems:'flex-end', color:Colors.primary, width:120, textAlign:'right',},
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
       	justifyContent: 'flex-end',
        textAlign:'right',
        alignItems:'flex-end',
        paddingRight:0,
        marginRight:0,

   },
   reviewBtn:{
    width:90,
    backgroundColor:Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'right',
    
    paddingLeft:0,
    paddingRight:0,
    height:20,
    marginTop:10
 },
 reviewBtnText:{
  color:Colors.white,
  fontFamily:'Font-Regular',
  fontSize:12,
   paddingLeft:2,
  paddingRight:2,
 },
 
cancelBtn:{
  backgroundColor:Colors.secondary,
  borderRadius:25,
  marginBottom:10
},
cancelBtnTxt:{
fontFamily:'Font-Medium',
textTransform:'capitalize',
fontSize:20,
color:Colors.primary

}
};