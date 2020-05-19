import {Colors,Layout} from '../../constants/';
export default {
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
    position : 'absolute',
    fontSize:18,
    left:5,
    top:5,
    padding:5,
    paddingRight:Layout.indent,
    paddingLeft:Layout.indent-7,
    color:'#000',
    textAlign:'left'
  
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
  addBox:{
    marginLeft:Layout.indent-6,
    marginRight:Layout.indent-6,

    height:120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
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
   fontSize:14,
  },
  filterItemStyles:{
    paddingTop:6,
    paddingBottom:5,
     paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
    marginRight:0,
    borderWidth:1,
    borderColor:'#ddd',
    marginRight:2
  },
  filterStyles:{
    textAlign: 'center',
    fontFamily:'Font-Medium',
   fontSize:11,
  },
  filterIconstyle:{
    backgroundColor:'#fff',
    textAlign:'center',
    width:null,
    height:null,
    marginLeft:Layout.indent-7,
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
    width:80,
    height:80,
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
    width: 80,
    marginRight:0
    
   },
   ListItems:{
   
    paddingTop:5,
    paddingBottom:5,
    marginLeft:Layout.indent-7,
    marginRight:Layout.indent-7,
    paddingRight:Layout.indent-7
   },
   prodInfo:{
    textAlign:'left'
   },
   proTitle:{
    textAlign:'left'
   },
   proPrice:{
    fontSize:25
   },
   proQuanitty:{
    fontSize:12
   },
   buyButton:{
    backgroundColor:'#F8BB1B',
    justifyContent: 'center',
      alignItems: 'center',
    textAlign:'center',
    alignSelf:'center',
   paddingLeft:0,
   paddingRight:0,
   width:90,
   height:25,
   marginTop:10
   },
   buyText:{
    alignSelf:'center',
    textAlign:'center',
    fontSize:12,
    color:Colors.secondary
   }
};