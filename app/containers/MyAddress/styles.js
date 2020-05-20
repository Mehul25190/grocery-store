 
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
  

             
}  