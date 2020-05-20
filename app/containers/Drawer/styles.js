import {Colors,Layout} from '../../constants/';
export default {
  header: {
    height: 120,
    paddingTop: Layout.indent,
    backgroundColor: Colors.primary
  },
  logoutFooter: {
    backgroundColor: Colors.secondary,
    padding:0,
    margin:0
  },
  logoutBtn: {
    flex: 1,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Font-Regular',
  },
  white:{
    color: Colors.white
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
};