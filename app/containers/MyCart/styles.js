import {Colors,Layout} from '../../constants/';
export default {

 
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
   txtDate:{
    marginLeft:Layout.indent,
    marginRight:Layout.indent,
    fontFamily:'Font-Regular',
    fontSize:14,
    lineHeight:18
   },
   paddingBox:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  marginTop:10,
  paddingLeft:Layout.indent-5,
  paddingTop:2,
  zIndex:2,
 },
  firstRow:{
  padding:0,
  margin:0,
  borderBottomWidth:1,
  borderColor:Colors.primary
 },
 orderTitleText:{
  color:Colors.gray,
  fontSize:16,
  fontFamily:'Font-Medium'
 },
orderTitle:{
  padding:0,
  margin:0
},
QtyBox:{
  alignItems:'flex-end',
  padding:7,
  justifyContent:'flex-end'
 },
 amulMoti:{
  width:100,
  height:'auto',
  flex:1,
  resizeMode:'contain'
 },
  secondRow:{
  
  paddingBottom:20,
  marginTop:10,
  marginBottom:5,
  borderBottomWidth:1,
  borderColor:Colors.primary,
  
 },
  amulCol:{
  width:120
 },
 AmuText:{
  color:Colors.gray,
  fontFamily:'Font-Medium',
  fontSize:14,
  lineHeight:16
 },
 AmuTextTitle:{
  fontSize:16,
  lineHeight:20,
  color:Colors.black
 },
  bodyText:{
  color:Colors.white,
  fontFamily:'Font-Regular',
  fontSize:15,
  lineHeight:20
 },
 bottomCart:{
  color:Colors.white,
  fontSize:25,
  marginRight:5
 },
 checkOutBtn:{
  backgroundColor:Colors.secondary,
  borderRadius:25,
  height:28,
 
 },
 checkOutText:{
  fontFamily:'Font-Medium'
 },
 

  BottomView:{
   backgroundColor:Colors.primary,
  paddingLeft:Layout.indent,
  paddingRight:Layout.indent
  
 }

};