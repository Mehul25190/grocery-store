 
import {Colors,Layout} from '../../constants/';
export default {
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
		top:2,
		right:5
		
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
   color: Colors.primary,
    padding:1,
    fontFamily:'Font-Medium',
    fontSize:16,
    paddingLeft:10
   
  },   
 
 IconNewStyle: {
 	position:'absolute',
  left:5,
  fontSize:13,
  color:'#fff'
  },
  InputView:{
  marginTop: 10,
  marginRight:Layout.indent-5,
  marginLeft:Layout.indent,
  borderColor:Colors.primary
  // flex:1,
  // borderRadius: 10,
  // paddingLeft:15,
  // backgroundColor:Colors.white,
  // color:Colors.white,
  // fontFamily:'Font-Medium',
  // marginBottom:10,
  // shadowColor: "#000",
  // shadowOffset: {
  // width: 0,
  // height: 2,
  //   },
  //   shadowOpacity:2,
  //   shadowRadius: 4,
  //   borderColor:'#E1E1E1',
  //   borderWidth:1,
  //   elevation: 1,
  },
    labelText:{
    fontFamily:'Font-Medium',
    color:Colors.black,
    marginLeft:Layout.indent-10
   },
 reasonView:{
  
    marginTop: 15,
    marginRight:Layout.indent-5,
    
    // flex:1,
    // borderRadius: 10,
    // paddingLeft:3,
    // backgroundColor:Colors.white,
    // color:Colors.white,
    // fontFamily:'Font-Medium',
    // marginBottom:10,
    // shadowColor: "#000",
    // shadowOffset: {
    // width: 0,
    // height: 2,
    // },
    // shadowOpacity:2,
    // shadowRadius: 4,
    // borderWidth:1,
    // borderColor:'#E1E1E1',
    // elevation: 1,
  },
   DownArrow:{
    position:'absolute',
    right:10,
    width:18,
    height:15,
    top:15,zIndex:99
  },
   dorpDownReason: {
   paddingLeft:5,
   flex:1,
   height:45,
   color:Colors.gray,
   fontFamily:'Font-Medium',

   },
   saveBtn:{
   	borderRadius:25,
   	marginLeft:Layout.indent-5,
   	marginRight:Layout.indent-5,
   	backgroundColor:Colors.secondary,
   	height:40
   },
   saveBtnText:{
   	fontFamily:'Font-Medium',
   	textTransform:'capitalize',
   	fontSize:18,
    color:Colors.primary
   },
   inputText:{
   	fontFamily:'Font-Medium',
   	color:'#B9B9B9',
    marginLeft:Layout.indent-10,
    marginRight:Layout.indent-5,
    height:40,
    paddingTop:10
   }

             
}  
