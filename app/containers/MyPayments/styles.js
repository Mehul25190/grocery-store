 
import {Colors,Layout} from '../../constants/';
export default {
	walletIcon:{
		width:40,
		height:32,
		contain:'cover',
		marginTop:5,
		marginBottom:5
	},
	cardIcon:{
		width:38,
		height:25,
		contain:'cover',
		marginTop:5,
	paddingBottom:5
	},
	CachIcon:{
		width:45,
		height:35,
		contain:'cover',
		
	paddingBottom:5
	},
	addCardIcon:{
	width:45,
		height:26,
		contain:'cover',
		marginTop:5,
		
	},
	btn:{
	paddingRight:10
	},
	  img:{
	   color:Colors.primary
	},
	testStyles:{
		fontFamily:'Font-Medium',
		fontSize:14,
		lineHeight:20
	},
	cardAdd:{
		justifyContent:'center',
		alignItems:'center',
		width:80,
		padding:0,
		
	},
	cardAddText:{
	color:Colors.primary,
	fontSize:13,

	fontFamily:'Font-Medium'
	},
payRadio:{
	width:40,
},
PayMethodOther:{
	marginRight:Layout.indent,
	marginBottom:0,
	paddingBottom:10,
	height:60,
	justifyContent:'flex-start',
paddingLeft:0,
	marginLeft:0,
	paddingTop:15
},
walletBtn:{
  paddingVertical:10,
  color:Colors.primary,
  justifyContent:'center',
  alignItems:'center',
  borderLeftWidth:1,
  borderColor:'#ddd',
  paddingLeft:10,
  marginLeft:Layout.indent,
  height:65,
 
},
walletBtnText:{
	color:Colors.primary,
	fontSize:14,
	paddingHorizontal:7,
	fontFamily:'Font-Medium'
},
payOptions:{
	fontSize:14,
	fontFamily:'Font-Medium',
	lineHeight:18
},
payOptionscard:{
	fontSize:14,
	fontFamily:'Font-Medium',
	lineHeight:18,
	textAlign:'left',
},
payCashText:{
	fontSize:11,
	fontFamily:'Font-Medium',
	lineHeight:18,
	textAlign:'left',
},
	PayMethod:{
  borderColor:'#ddd',
  marginRight:Layout.indent,
  borderBottomWidth:1.2,
  marginBottom:5,
  paddingTop:15,
  paddingBottom:15,
  height:75,
  marginLeft:0
  
},
BankImg:{
	width:40,
	height:40,
	resizeMode:'contain',
	 alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    zIndex:999
},
buttonContainer: {
    marginBottom: 30,
 },
 bankName:{
 	
textAlign:'center',
marginRight:10,
fontFamily:'Font-Medium',
fontSize:16,
marginTop:5
 },
circle: {
   	width:70,
   	height:70,
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:Colors.primary,
 
},
checkedCircle: {

	backgroundColor:'transparent'
},
dorpDownReason: {
   borderRadius:50,
   zIndex:50,
   flex:1,
   height:45,
   color:Colors.gray,
   fontFamily:'Font-Medium'
   },
	 DownArrow:{
    position:'absolute',
    right:10,
    width:18,
    height:15,
    top:15,zIndex:99
  },
	 reasonView:{

 width: Layout.width,
  marginTop: 10,
  marginRight:Layout.indent-10,
  marginLeft:Layout.indent-10,
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
 
	checkboxStyle:{borderColor:Colors.primary, width:32, borderRadius:5, borderWidth:2},
	ExpiresTitleCol:	{marginLeft:Layout.indent, width:80, justifyContent:'center'},
	ExpiresCol:{borderRightWidth:2, alignItems:'center',borderColor:'#B9B9B9',marginRight:0},
	CardRow:{borderBottomWidth:2,borderColor:'#B9B9B9', height:53.33, paddingBottom:4, paddingTop:4,},

inputStyleCard:{
	marginLeft:Layout.indent,
	fontSize:16,
	color:'#B9B9B9',
	fontFamily:'Font-Medium',
	height:40
},
CardIcon:{
marginRight:Layout.indent,
color:'#B9B9B9',
fontSize:35
},
ExpiresStyle:{
fontFamily:'Font-Medium',color:'#B9B9B9',
height:35,
fontSize:16
},
lockStyle:{
	fontSize:30,
	color:'#B9B9B9',
},

CardNameStyle:{
marginLeft:Layout.indent,
fontFamily:'Font-Medium',color:'#B9B9B9',
fontSize:16
},
greenback:{
	backgroundColor:'#e8f8e9',
	paddingTop:10,
	borderColor:'#ddd',
	flex:0,
	paddingLeft:15,
	paddingRight:15,
	justifyContent:'center',
	height:'auto',
	paddingVertical:5
},
whiteBack:{
	backgroundColor:'#fff',
		borderBottomWidth:1,
	
	marginTop:10,
	borderColor:'#ddd',
	flex:0,
	paddingLeft:15,
	paddingRight:15,
	justifyContent:'center',
	height:'auto',
	paddingVertical:5
},
saveCardBox:{
	borderBottomWidth:1,
	
	marginTop:10,
	borderColor:'#ddd',
	flex:0,
	paddingLeft:15,
	paddingRight:15,
	justifyContent:'center',
	height:'auto',
	paddingVertical:5
},
autoDebitText:{
	fontFamily:'Font-Medium',
	color:Colors.primary,
	fontSize:14
},
savedCardText:{
	fontFamily:'Font-Medium',
	fontSize:14,
	color:'#B9B9B9',
	lineHeight:20
},
trashIcon:{
	fontSize:20,
	color:Colors.secondary
},
cardBox:{
	borderWidth:2,
	borderRadius:15,
	backgroundColor:'#fff',
	marginTop:10,
	borderColor:'#B9B9B9',
	flex:0,
	height:'auto',
	justifyContent:'center',
	height:160
},
addmoney:{
	paddingTop:10,
	paddingBottom:15
},
moneyBorder:{
	borderWidth:1,
	paddingLeft:10,
	paddingRight:10,
	borderColor:Colors.primary,
	borderRadius:12,
	marginBottom:0,
	paddingBottom:0,
	marginLeft:5,
	marginRight:5
},
listAmnt:{
	fontFamily:'Font-Medium',
	color:Colors.black,
	lineHeight:25,
	paddingVertical:5,
	textAlign:'center'
},
selectedAmnt:{
	fontFamily:'Font-Medium',
	color:Colors.black,
	marginLeft:10
},
tabBody:{

	// backgroundColor:'#ddd'
},
tabHeading:{
// backgroundColor:'#ddd',
borderWidth:0,
paddingLeft:0,
borderColor:'transparent'
},
StyleTabs:{
	paddingLeft:0,
backgroundColor:'#ddd',
marginLeft:Layout.indent,
marginRight:Layout.indent,
borderBottomWidth:0,
},	
textStyle:{
	fontFamily:'Font-Medium',
	color: Colors.primary,
	paddingLeft:15,
	paddingRight:15,
	paddingVertical:5,
	fontSize:12,
	lineHeight:15,
	textAlign:'center'
},
activeTextStyle:{
	fontFamily:'Font-Medium',
	color:Colors.white,
	backgroundColor:Colors.primary,
	paddingLeft:15,
	paddingRight:15,
	paddingVertical:5,
	borderRadius:25,
	fontSize:12,
	lineHeight:18,
	textAlign:'center'
},
TabsStyle:{
	height:25,
	// backgroundColor:'transparent',
	
},
amountBox:{
	paddingVertical:10,
},
activeStyle:{
backgroundColor:Colors.white,
borderWidth:0,
alignItems:'center',
justifyContent:'center',
},
tabStyle:{
	
	paddingLeft:0,
	alignItems:'center',
	borderBottomWidth:0,
	justifyContent:'center',
	backgroundColor:Colors.white,
	flexDirection:'row'
},
titleText:{
fontFamily:'Font-Medium',
},
amountText:{
	fontFamily:'Font-Medium',
	fontSize:20,
	lineHeight:22,
	textAlign:'center',
	color:Colors.primary
},
txtText:{
	fontFamily:'Font-Regular',
	color:Colors.black,
	textAlign:'center',
	lineHeight:20,
},
 locationIcon: {
  position:'absolute',
  zIndex:99,
  top:16,
  left:20,
  color:Colors.primary
  },
currentLocationStyle:{
		textInputContainer: {
	backgroundColor: 'transparent',
	borderTopWidth: 0,
	borderBottomWidth: 0,
	paddingTop:0,
	height:'auto',
	position:'relative'
	},
	textInput: {
	marginLeft: 0,
	marginRight: 0,
	height: 38,
	color: Colors.lightIcon,
	fontFamily:'Font-Medium',
	fontSize: 18,
	marginTop:12,
	marginBottom:10,
	textAlign:'left',
	paddingLeft:Layout.indent + 50

	},
	predefinedPlacesDescription: {
	color: Colors.lightIcon,
	paddingLeft:Layout.indent + 35
	},
},
addAddressStyle: {
 	flexDirection: 'row',
		backgroundColor: Colors.primary,
		borderRadius:50,
		justifyContent: "center",
		alignItems: "center",	
		paddingTop:3,
		paddingBottom:3,
		width:150,
		marginLeft:Layout.indent
  },
  StrashIconStyle:{
		position:'absolute',
		top:5,
		right:10
		
  },
  EditIconStyle:{
  		position:'absolute',
		top:5,
		right:30
		
  },
	savedAddress:{
		flexDirection: 'row',
		backgroundColor: Colors.primary,
		borderRadius:50,
		justifyContent: "center",
		alignItems: "center",	
		paddingTop:3,
		paddingBottom:3,
		width:150,
		marginLeft:Layout.indent
	},
	SavedTextStyle:{
    color: '#fff',
    padding:1,
    fontFamily:'Font-Medium',
    fontSize:13
  },
    addressTextStyle: {
   color: '#fff',
    padding:1,
    fontFamily:'Font-Medium',
    fontSize:13,
    paddingLeft:10
   
  },   
 
 IconNewStyle: {
 	position:'absolute',
   left:5,
  fontSize:13,
  
    color:'#fff'
  },
  checkOutBtnArea:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
    paddingLeft:Layout.indent,
  paddingRight:Layout.indent,
  marginTop:20,
  marginBottom:20

},
continueShoppingBtnArea:{
	marginLeft:Layout.indent,
	marginRight:Layout.indent,
	  paddingLeft:Layout.indent,
	paddingRight:Layout.indent,
	marginTop:-60,
	marginBottom:10
  
  },
addmoneyArea:{
  marginLeft:Layout.indent+15,
  marginRight:Layout.indent+15,
  paddingLeft:Layout.indent+5,
  paddingRight:Layout.indent+5,
 marginBottom:10
},
addMoneyBtn:{
   backgroundColor:Colors.primary,
  borderRadius:15
 
},
 checkOutBtn:{
   backgroundColor:Colors.secondary,
  borderRadius:25
 
},
btnText:{
 fontFamily:'Font-Medium',
  fontSize:20,
  lineHeight:28,
  textTransform:'capitalize'

},
 checkOutText:{
  fontFamily:'Font-Medium',
  fontSize:20,
  lineHeight:28,
  textTransform:'capitalize',
  color:Colors.primary
 },

 
 promoBtn:{
   backgroundColor:Colors.secondary,
  borderRadius:25
 
},
 promoText:{
  fontFamily:'Font-Medium',
  fontSize:16,
  lineHeight:22,
  textTransform:'capitalize',
  color:Colors.primary
 },

             
}  