import {Colors,Layout} from '../../constants/';
export default {
  header: {
   
   
    backgroundColor: Colors.primary
  },
  logoutFooter: {
    backgroundColor: Colors.white,
   
  },
  logoutBtn: {
       
    justifyContent: 'flex-start',
    fontFamily: 'Font-Regular',
  },
  logoutIcon:{
    color: Colors.lightIcon,
    fontSize:16,
    padding:2
  },
  logoutText:{
  color: Colors.lightIcon,
  fontSize:17,
  paddingLeft:Layout.indent+3,
  textTransform: 'capitalize',
  fontFamily:'Font-Medium'
  },
 
};