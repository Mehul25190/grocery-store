import {Colors,Layout} from '../../constants/';
export default {
  IconsRightT:{
    fontSize:16,
    color:Colors.primary,
    borderColor:Colors.primary,
    width:25,
    alignItems:'center',
    height:25,
    justifyContent:'center',
   textAlign:'center',
    borderWidth:1,
    borderRadius:50,
    // backgroundColor: '#ddd',
    padding:3,
    alignSelf:'center',
    marginLeft:0,
    flexDirection:'row',
    transform: [{rotate: '90deg'}], 
  },
 redButton:{
 	fontSize:18,
    fontWeight:'bold',
  fontFamily:'Font-Medium',
  textTransform:'capitalize'
 },
 bodyText:{
 	textAlign:'left',
 	paddingBottom:0,
   // backgroundColor:'#ddd'
  
   
 },
 IconsRight:{

 },
 proPrice:{
  marginTop:8,
  textAlign:'right'
 },
 statusBtn:{
  width:90,
  backgroundColor:Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    alignSelf:'flex-end',
    paddingLeft:0,
    paddingRight:0,
    height:20,
    marginTop:5
 },
 statusText:{
  color:Colors.primary,
  fontFamily:'Font-Medium',
  fontSize:12,
   paddingLeft:2,
  paddingRight:2,
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
 	color:'#3C3C3C'
 },
 dateRow:{
 	backgroundColor:'#fff',
 	paddingTop:10,
 	paddingBottom:10,
  zIndex:0
 },
  ListItems:{  
    borderBottomWidth:1,
    borderColor:Colors.secondary,
    paddingTop:5,
    paddingBottom:5,
    marginLeft:Layout.indent,
    marginRight:Layout.indent-7,
    paddingRight:Layout.indent-7
   },
     ListLeft:{
   
    flex: 0,
    paddingLeft:0,
    width: 90,
    
   },
proTitle:{
  fontFamily:'Font-Medium',
  marginLeft:1,
},
paidTime:{
fontFamily:'Font-Regular',
fontSize:13,
color:Colors.gray,
marginLeft:1
},
     proImage:{
    textAlign:'left',
    marginLeft:5,
    width:75,
    height:75,
    resizeMode:'contain',
   },
     ListRight:{
      flex:0,
      // backgroundColor:'#ddd',
     	height:70,
     	justifyContent: 'flex-start',
      alignItems:'flex-end',   	
     textAlign:'flex-end'
   },
};