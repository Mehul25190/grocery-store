import {Colors,Layout} from '../../constants/';
export default {
  IconsRightT:{
    fontSize:20,
    color:'#fff',
    borderColor:'#fff',
    width:28,
    alignItems:'center',
    height:28,
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
 	borderBottomWidth:1,
 	borderColor:Colors.primary,
 	paddingBottom:20,
   // backgroundColor:'#ddd'
  
   
 },
 IconsRight:{

 },
 proPrice:{
  textAlign:'right'
 },
 statusBtn:{
  width:70,
  backgroundColor:'#F8BB1B',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    alignSelf:'center',
    paddingLeft:0,
    paddingRight:0,
    height:20,
    marginTop:5
 },
 statusText:{
  color:Colors.secondary,
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
 	paddingBottom:10
 },
  ListItems:{
   borderColor:Colors.primary,

    paddingTop:5,
    paddingBottom:5,
    marginLeft:Layout.indent-7,
    marginRight:Layout.indent-7,
    paddingRight:Layout.indent-7
   },
     ListLeft:{
   justifyContent:'center',
    alignItems:'center',
    flex: 0,
    paddingLeft:0,
    width: 75,
    
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
      fontSize:35,
    textAlign:'left',
    marginLeft:5,
    width:65,
    height:65,

   
   },
     ListRight:{
      flex:0,
      // backgroundColor:'#ddd',
     	height:70,
     	justifyContent: 'flex-start',
      alignItems:'flex-end',
     	borderBottomWidth:1,
  	borderColor:Colors.primary,
   	
     textAlign:'right'
   },
};