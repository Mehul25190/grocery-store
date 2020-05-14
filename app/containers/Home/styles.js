import {Colors,Layout} from '../../constants/';
export default {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft:7,
    marginRight:7,

    height:155,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
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
  fontSize:40,
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
  fontSize:10,
  paddingTop:2,
  borderRadius:25,
  borderWidth:1,
  borderColor:'#333',
  color:'#333',

 textAlign:'right',
},
btnBlock:{
   top:-15,

width: '100%',
 justifyContent: 'flex-end',
alignItems: 'flex-end'
}

  
};