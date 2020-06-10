import {Colors,Layout} from '../../constants/';
export default {
   labelText:{
   	fontFamily:'Font-Medium',
   	color:Colors.black
   },
   inputStyle:{
   	height:30,
   	color:Colors.gray
   },
   itemStyle:{
   	borderColor:Colors.primary,
   	marginRight:Layout.indent
   },
  checkBoxStyle:{
   flex:1,
   marginLeft:Layout.indent,
   paddingTop:10,
   marginTop:5,
   marginBottom:5,
   fontSize:14,
   fontFamily:'Font-Medium',
   paddingRight:Layout.indent
  },
  ringBellBlock:{
  	flex: 1,
    
      marginLeft:Layout.indent,
      marginTop:15,
      justifyContent:'flex-start',
      alignItems:'flex-start',
     alignSelf: 'flex-start',
      flexDirection: 'row',

  },
  checkboxStyle:{
  borderColor:Colors.primary, width:32, borderRadius:5, borderWidth:2
  },
     DownArrow:{
      position:'absolute',
      right:12,
      width:18,
      height:15,
      top:18,zIndex:99
    },
    calImage:{
    flex:0,
    width: 30 ,
    resizeMode:'contain',
    height:30,
    marginBottom:5,
    justifyContent:'flex-end'
  },
  labeldateText:{
  	paddingBottom:10,
    top:-10,
    position:'absolute',
    fontFamily:'Font-Medium',
    color:Colors.black,
    fontSize:16
  },
  datePickerItem:{
  	justifyContent:'flex-start',
  	alignItems:'flex-end', 
  	height:60,
  	position:'relative' ,
  	borderColor:Colors.primary
  }
}