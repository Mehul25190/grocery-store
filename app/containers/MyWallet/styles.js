import {Colors,Layout} from '../../constants/';
export default {
  prodInfo:{
    textAlign:'left',
    justifyContent:'flex-start'
  },
  proTitle:{
    fontFamily:'Font-Medium',
    alignSelf:'flex-start',
    marginLeft:1,
  },
  paidTime:{
    fontFamily:'Font-Regular',
    color:Colors.gray,
    fontSize:14,
    textAlign:'left',
    paddingLeft:1,
    marginLeft:1,
    alignSelf:'flex-start'
  },
 redButton:{
    fontSize:20,
    color:Colors.primary,
    fontFamily:'Font-Medium',
    textTransform:'capitalize'
 },
 walletBtn:{
fontFamily:'Font-Medium',
 },
 walletBox:{
 	marginLeft:Layout.indent,
 	marginRight:Layout.indent
 },
 walletRow:{
 marginBottom:15,
 marginTop:10
 },
 walletCol:{
 	marginLeft:Layout.indent+20,
 	width:70
 },
 amountCol:{
	justifyContent:'center'
 },
 walletIcon:{
 	width:50,
 	height:50,
 	resizeMode:'contain'
 },
 amountRs:{
 	fontWeight:'bold',
 	fontSize:20
 },
 BalanceTitle:{
 	marginLeft:Layout.indent,
 	marginTop:20,
 	marginBottom:3,
 	fontFamily:'Font-Medium',
 },
 walletDate:{
 	marginLeft:Layout.indent,
 	fontFamily:'Font-Regular',
 },
 dateRow:{
 	backgroundColor:'#fff',
 	paddingTop:10,
 	paddingBottom:10
 },
  ListItems:{
   justifyContent:'flex-start',
    paddingTop:10, borderBottomWidth:1,
    paddingBottom:10,
    marginLeft:Layout.indent-7,
    marginRight:Layout.indent-7,
    paddingRight:Layout.indent-7,
    borderColor:Colors.secondary
   },
     ListLeft:{
   
    flex: 0,
    paddingLeft:0,
    width: 90,
   },
   ListRight: {
    width:120, alignSelf:'center', justifyContent:'center'
   },
   proPrice: {
     alignSelf:'flex-end', color:'#ff0000'
   },
   proPriceGreen: {
     alignSelf:'flex-end', color:Colors.primary,
   },
     proImage:{

    textAlign:'left',
    marginLeft:5,
    width:80,
    height:80,
    resizeMode:'contain',
   },
};