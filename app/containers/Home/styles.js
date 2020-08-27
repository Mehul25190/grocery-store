import {Colors,Layout} from '../../constants/';
const horizontalMargin = 20;
const slideWidth = Layout.window.width;

const sliderWidth =Layout.window.width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;
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
   Modeltext: {
     color:'#000',
     fontSize:14,
     fontFamily:'Font-Regular',
     textAlign:'center',
     paddingHorizontal:5
   },
   closeOk:{
    marginTop:10,
    paddingVertical:10,
    backgroundColor:Colors.primary,
    justifyContent:'center',
    alignItems:'center'
   },
   closeIcon:{
  position:'absolute',
  top:15,
  right:15,
    justifyContent:'flex-end',
    alignItems:'flex-end'
   },
  pendingDays:{
    fontSize:11,
    color:Colors.primary,
    lineHeight:22,
    fontFamily:'Font-Medium',
  },
  smileIcon:{
    color:'#CCCC00',
    justifyContent:'center',
    alignItems:'center',
    width:50,
    fontSize:30,
    padding:10,
    alignSelf:'center'
  },
  infoCircle:{
    color:Colors.primary,
    fontSize:20,
    paddingLeft:5
  },
    slide: {
        marginRight:Layout.indent,
        width: Layout.window.width-10,
        height: 125,
        marginLeft:0,
        paddingLeft:5,
        paddingHorizontal: horizontalMargin
        // other styles for the item container
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1
        // other styles for the inner container
    },
productTitle:{
    position : 'absolute',
    fontSize:14,
    left:5,
    top:5,
    padding:5,
    paddingRight:Layout.indent,
    paddingLeft:Layout.indent-7,
    color:'#000',
    textAlign:'left',
    fontFamily: 'Font-Medium',
    lineHeight:18
  
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
    marginLeft:Layout.indent-5,
    marginRight:Layout.indent-5,
    paddingBottom:0,
    
  },
  
  shopSubTitleText:{
    fontSize:11,
    fontFamily:'Font-Medium',
    color:'#f05e1b',
    // borderWidth:1,
    // borderColor:'blue',
    // borderRadius:25,
    lineHeight:22,

   
    paddingBottom:0,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    marginBottom:0
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
  fontSize:14,
  paddingTop:5,
   fontFamily:'Font-Medium',
  textTransform:'uppercase'
},
addsBigTitle:{
  fontFamily:'Font-Bold',
   color:'#F8BB1B',
  textAlign:'right',
  fontSize:32,
  letterSpacing:2,
  // top:-8,
  lineHeight:42
  
},
addsText:{
  // backgroundColor:'#ddd',
  color:'#F8BB1B',
  textAlign:'right',
  fontSize:12,
  lineHeight:13,
  paddingBottom:0
 // top:-10,
},
discountBlock:{
  paddingRight:10
},
discountBtn:{
  fontSize:11,
  paddingTop:1,
  lineHeight:15,
 paddingRight:15,
 paddingLeft:15,
  borderRadius:25,
  borderWidth:1,
  borderColor:'#333',
  color:'#333',
textTransform:'uppercase',
 textAlign:'right',
},

btnBlock:{
   // top:-15,
   // backgroundColor:'#ddd',
  marginTop:10,
  justifyContent: 'flex-end',
  alignItems: 'flex-end'
},

/* Product Lsit page*/
currencyOffer:{
     color:'#F8BB1B',

},
MRPtext:{
  // top:-3,
  textAlign:'right',
    color:'#F8BB1B',
  textDecorationLine:'line-through'
},
officePrice:{
   // top:-3,
   color:'#F8BB1B',
   textAlign:'right',
   fontSize:18,
   fontFamily:'Raleway-Regular',
   textTransform:'uppercase'
},
PriceRate:{
  // top:-7,
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