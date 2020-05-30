import {Colors,Layout} from '../../constants/';
export default {
  ListReason:{
      
    height:36,
  
  },
  reasonTitle:{
    fontFamily:'Font-Medium'
  },
  textAreaStyle:{
   
  
    paddingLeft:10,
    paddingRight:5,
    marginTop:Layout.indent-10,
    justifyContent:'flex-start',
   textAlignVertical:'top',
   fontFamily:'Font-Regular',
   color:Colors.gray,
   fontSize:14,
  },
  listArea:{
    paddingBottom:10,
    marginLeft:0,
    marginRight:0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
    width: 0,
    height: 2
    },
    shadowRadius: 1,
    shadowOpacity: .50,
    elevation: 1.5
  },
  cancelReasonBox:{
    marginLeft:Layout.indent,
    marginRight:Layout.indent,
    marginTop:Layout.indent-5,

  },
  starBox:{
    padding:10,
    height:'auto',
    marginBottom:22
  },
  reasonText:{
    fontFamily:'Font-Medium',
    color:Colors.primary,
    lineHeight:20,
    fontSize:16,
    

  },
rateItems:{
marginLeft:Layout.indent,
marginRight:Layout.indent,
paddingLeft:Layout.indent,
paddingRight:Layout.indent,
marginTop:Layout.indent-5,
borderBottomWidth:1,
borderColor:Colors.primary
},
 paddingBox:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  marginTop:10,
  paddingLeft:Layout.indent-5,
  paddingTop:15,
  paddingBottom:15,
  zIndex:2,
 },
 walletRow:{
 marginBottom:15,
 
 },
 amulCol:{
  marginLeft:Layout.indent,
  
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
 amulInfo:{
  // backgroundColor:'#ddd'
 },
 
 submitBtnArea:{
  marginLeft:Layout.indent,
  marginRight:Layout.indent,
  marginTop:10
 },

 submitBtn:{
  borderRadius:25,
  backgroundColor:Colors.secondary,
  padding:12,
  
 },
 submitText:{
  fontFamily:'Font-Bold',
  fontSize:22,
  textTransform:'capitalize'
 },
 amulMoti:{
  width:100,
  height:'auto',
  flex:1,
  resizeMode:'contain'
 },


 

};