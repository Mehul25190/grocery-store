import {Colors,Layout} from '../../constants/';
export default {
  redButton:{
fontFamily:'Font-Medium',
fontSize:20,
textTransform:'capitalize',
paddingTop:5
  },

msgTitleTxt:{
	fontFamily:'Font-Medium',
	fontSize:18
},
msgText:{
	fontFamily:'Font-Regular',
	fontSize:14,
	lineHeight:16
},
borderTop:{
	marginLeft:Layout.indent,
	
	 marginTop:20,
	  marginBottom:5,
	 paddingBottom:12,
	  borderTopWidth:1.5,
	  borderColor:Colors.primary,
	marginRight:Layout.indent
},
cancelRs:{
 textDecorationLine:'line-through'
},
TotalTitle:{
	fontFamily:'Font-Medium'
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