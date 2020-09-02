import {Colors,Layout} from '../../constants/';
export default {
  cateContainer:{
    flex: 1,
      height:50,
    width:Layout.width,
      paddingTop:7,
    paddingBottom:5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: Layout.indent,
    paddingRight: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
   photo: {
     flex:1,
    width: null,
    height: null,
    resizeMode: 'contain',
      justifyContent: 'flex-end',
      flexDirection:'column',
      marginTop:50,
      marginLeft:Layout.indent
     
  },
  productTitle:{
     paddingTop:6,
    paddingBottom:5,

    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
  marginRight:0
  },
  titleBackground:{
backgroundColor:Colors.secondary,
  paddingTop:3,
    paddingBottom:5,
    color:Colors.white,
    paddingLeft: 20,
   
    paddingRight: 20,
    borderRadius: 25,
     overflow: 'hidden',
  marginRight:0,

  },
  whiteBackground:{
backgroundColor:'transparent',
  paddingTop:6,
    paddingBottom:5,

    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
     overflow: 'hidden',
  marginRight:0
  },
  AlignLeft:{
    justifyContent:'flex-start'
  },
  AlignRight:{
    justifyContent:'flex-end'
  },
  FirstItem:{
      flex: 1,
      position : 'relative',
      backgroundColor:Colors.primaryLight,
      marginLeft: Layout.ITEM_MARGIN,
      marginTop: 10,
      width: (Layout.SCREEN_WIDTH - (Layout.ItemNumColums + 1) * Layout.ITEM_MARGIN) / Layout.ItemNumColums,
      height: 300,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 8
  },
   ItemContainer: {
     flex: 1,
     position : 'relative',
    backgroundColor:Colors.primaryLight,
    marginLeft: Layout.ITEM_MARGIN,
    marginTop: 10,
    width: (Layout.SCREEN_WIDTH - (Layout.ItemNumColums + 1) * Layout.ITEM_MARGIN) / Layout.ItemNumColums,
  height: Layout.ITEM_HEIGHT,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 8

  },
  ItemLayout:{
  
   flex: 2.5,
   justifyContent: 'flex-end',
   flexDirection: 'column',
  },
  shopSubTitle:{
    marginTop:5,
    marginLeft:Layout.indent,
    marginRight:Layout.indent,
    paddingBottom:0,
    
  },
  shopSubTitleText:{
    fontSize:14,
    color:'#000'
  },
  itemStyle:{
    // marginTop: 5
    marginLeft:0
  },
  loginBox: {
    marginTop: -Layout.indent,
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
  },
  midText:{
    fontSize: 18,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
  },
  linkTextBtn:{
    marginTop:Layout.indent
  },
  linkText:{
    textTransform:'capitalize',
    color: Colors.white,
    fontSize:16,

  },
  button: {
    backgroundColor: Colors.secondary,
  },
  formMsg: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'center',
    backgroundColor: "rgba(0,0,0,0)"
  },
  linky: {
    color: 'blue',
    paddingTop: 10
  },
  
addsSubTitle:{
  color:'#F8BB1B',
  textAlign:'right',
  fontSize:16,
  padding:0
},
addsBigTitle:{
  fontFamily:'Raleway-Bold',
   color:'#F8BB1B',
  textAlign:'right',
  fontSize:32,
  letterSpacing:2,
  top:-8,
  fontWeight:'bold',
},
addsText:{
  color:'#F8BB1B',
  textAlign:'right',
  fontSize:12,
 top:-10,
},
discountBlock:{
  paddingRight:10
},
discountBtn:{
  fontSize:8,
  paddingTop:2,
  borderRadius:25,
  borderWidth:1,
  borderColor:'#333',
  color:'#333',
textTransform:'uppercase',
 textAlign:'right',
},

btnBlock:{
   top:-15,

  width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'flex-end'
},

/* Product Lsit page*/
currencyOffer:{
     color:'#F8BB1B',

},
MRPtext:{
  top:-3,
  textAlign:'right',
    color:'#F8BB1B',
  textDecorationLine:'line-through'
},
officePrice:{
   top:-3,
   color:'#F8BB1B',
   textAlign:'right',
   fontSize:18,
   fontFamily:'Raleway-Regular',
   textTransform:'uppercase'
},
PriceRate:{
  top:-7,
  fontSize:25,
  color:'#F8BB1B',
 textAlign:'right'
},
currencyPrice:{
  color:'#F8BB1B',
  fontSize:25,
},
discountOrder:{
  top:-5,
   fontSize:8,
  paddingTop:2,
  borderRadius:25,
  borderWidth:1,
  borderColor:'#333',
  color:'#333',
textTransform:'uppercase',
 textAlign:'right',
},
mangoSale:{
  flex: 1,
 height: null,
  width: null,
  resizeMode:'contain',
  marginLeft:Layout.indent
},
categoryStyles: {
    backgroundColor: '#000',
},

  flatListStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingRight: 0
  },
 itemStyles: {
  paddingTop:6,
    paddingBottom:5,

    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
  marginRight:0
  },

  textItemStyles: {
  textAlign: 'center',
  fontFamily:'Font-Medium',
   fontSize:12,
  },
  filterItemStyles:{

    paddingTop:2,
    paddingBottom:1,
     paddingLeft: 12,
    paddingRight: 20,
    borderRadius: 25,
    marginLeft:0,
    borderWidth:1,
    borderColor:'#ddd',
    marginRight:2,
    fontSize:8
  },
  filterStyles:{
    textAlign: 'center',
    fontFamily:'Font-Medium',
   fontSize:8,
  },
  filterIconstyle:{
    backgroundColor:'#fff',
    textAlign:'center',
    width:null,
    height:null,
    marginLeft:Layout.indent-7,
    marginRight:3,
      flex: 1,
  resizeMode:'contain',
  },
   imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  proImage:{
    textAlign:'left',
    marginLeft:5,
    width:75,
    height:75,
    resizeMode:'contain',
   },
   ListLeft:{
     flex: 0,
    paddingLeft:0,
    width: 90,
   },

   ListRight:{
    // backgroundColor:'#ddd',
    flex: 0,
    paddingLeft:0,
    width: 90,
    marginRight:0,
    justifyContent: 'flex-end',
    textAlign:'right'
   },

   ListItems:{
    paddingTop:5,
    paddingBottom:5,
    marginLeft:Layout.indent-7,
    marginRight:Layout.indent-7,
    paddingRight:Layout.indent-7,
    borderColor:Colors.primary
   },
   prodInfo:{
    textAlign:'left',
   },
   proTitle:{
    textAlign:'left',
    marginLeft:1
   },
   proPrice:{
    marginLeft:1,
    fontSize:18,
    //textDecoration:'none',
    // backgroundColor:'#ddd',
    flex:0,
    fontFamily:'Font-Medium'
   },
   proPriceStrike:{
    marginLeft:1,
    fontFamily:'Font-Medium',
    flex:0,
    // backgroundColor:'#333',
    fontSize:18,
    textDecorationLine:'line-through'
   },
   proQuanitty:{
    fontSize:12,
    marginLeft:1
   },
   buyButton:{
    //  backgroundColor:'#F8BB1B',
       justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center',
      alignSelf:'center',
      paddingLeft:0,
      paddingRight:0,
      width:99,
      height:35,
   },
   subscribeBtn:{
    borderWidth:0,
    elevation:0,
      color:Colors.primary,
      backgroundColor:'transparent',
      minWidth:90,
      height:32,
      marginTop:5,
      marginBottom:10,
      justifyContent: 'flex-end',
   },

   subText:{
    textAlign:'right',
    fontSize:11,
    paddingLeft:0,
    paddingRight:15,
    paddingBottom:3,
   color:Colors.primary,
   },

   buyText:{
    alignSelf:'center',
    textAlign:'center',
    fontSize:12,
    color:Colors.secondary
   },


   /* Custom Cat list*/
     categoryStyles: {
    backgroundColor: '#000',
  },

  flatListStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingRight: 0
  },


  textItemStyles: {
    textAlign: 'center',
    color:Colors.white
   
  }
};