import React from "react";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { NavigationActions } from "react-navigation";
import {
  Button,
  Text,
  Header,
  Item,
  Input,
  Left,
  Body,
  Title,
  Right,
  Icon,
  List,
  ListItem,
} from "native-base";

import appStyles from "../theme/appStyles";
import svgs from "../assets/svgs";
import { Screens, Colors, Layout, ActionTypes } from "../constants";
import Logo from "./Logo";
import Svgicon from "./Svgicon";
import Statusbar from "./Statusbar";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  CheckedOption,
} from "react-native-popup-menu";

import ModalBox from "./ModalBox";
import SetLanguage from "./SetLanguage";

const cartCount = 1;

class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      searcBar: false,
      filter: false,
      textValue: "",
      selectedStatus: "",
    };
  }
  onPress = () => {
    this.setState({ active: !this.state.active });
    this.props.onPress();
  };

  onPressSearch = () => {
    this.setState({ searcBar: !this.state.searcBar });
  };
  onPressFilter = () => {
    this.setState({ filter: !this.state.filter });
  };

  onChangeSearchText(text) {
    this.setState({textValue:text});
    if(text.length > 2)
      setTimeout(() => {  this.props.searchPage(this.state.textValue) }, 3000)
  }
  render() {

    const CheckedOption = (props) => (
      <MenuOption
        onSelect={() => this.props.searchFilter(props.value)}
        value={props.value}
        text={(props.checked ? "\u2713 " : "    ") + " " + props.text}
      />
    );
    const { searcBar } = this.state;
    const { totalItem } = this.props;
    return (
      <Header searchBar rounded style={[appStyles.headerStyle]}>
        <Left style={appStyles.headerLeft} icon>
          <Button
            transparent
            style={appStyles.menuBtn}
            onPress={() => this.onPress()}
          >
            <Icon
              style={appStyles.menuBar}
              size={30}
              color={Colors.white}
              type="AntDesign"
              name={this.props.IconLeft}
            />
          </Button>
        </Left>
        {this.state.searcBar == true ? (
          <Item style={[appStyles.searchBar]}>
            <Icon name="search" style={{ color: Colors.primary }} />       
            <Input
              style={appStyles.searchInput}
              onChangeText={(text)=>{
              this.onChangeSearchText(text)
              }}
              value={this.state.textValue}
              placeholder="Search..."
            />
          </Item>
        ) : (
          <Item style={{ width: 60, backgroundColor: "transparent" }}>
            <Text style={appStyles.headerTitle}>{this.props.Title}</Text>
          </Item>
        )}

        <Right style={[appStyles.headersRight, this.props.headersRight]}>
          {this.props.setFilter == true && (
            <Menu style={{}}>
              <MenuTrigger text="">
                <Icon
                  style={[appStyles.IconsRightT, this.props.IconsRightT]}
                  type="Entypo"
                  name={this.props.IconRightT}
                />
              </MenuTrigger>
              <MenuOptions style={{ backgroundColor: "#D2EAD2" }}>
                <CheckedOption  checked={this.props.selectedStatus == 'PEN' ? true : false } value={'PEN'} text="Pending" />
                <CheckedOption checked={this.props.selectedStatus == 'INP' ? true : false } value={'INP'} text="In Process" />
                <CheckedOption checked={this.props.selectedStatus == 'DEL' ? true : false } value={'DEL'} text="Delivered" />
                <CheckedOption checked={this.props.selectedStatus == 'CNF' ? true : false } value={'CNF'} text="Confirmed" />
                <CheckedOption checked={this.props.selectedStatus == 'RET' ? true : false } value={'RET'} text="Returned" />
                <CheckedOption checked={this.props.selectedStatus == 'CAN' ? true : false } value={'CAN'} text="Cancelled" />
              </MenuOptions>
            </Menu>
          )}

          {this.state.filter == true && (
            <View style={appStyles.sortBlock}>
              <Icon
                name="triangle-up"
                type="Entypo"
                style={{
                  position: "absolute",
                  color: Colors.primary,
                  top: -20,
                  right: 50,
                }}
              />

              <List style={{}}>
                <TouchableOpacity>
                  <Text style={appStyles.sortText}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={appStyles.sortText}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={appStyles.sortText}>Cancel</Text>
                </TouchableOpacity>
              </List>
            </View>
          )}

           {this.props.setProFilter == true && (
            <TouchableOpacity
              style={appStyles.filterArea}
              onPress={() =>this.props.FilterShow() }
            >
              <Icon style={appStyles.filteroutline} name="filter" type="Feather" />
             
            </TouchableOpacity>
          )}

            {this.props.setSort == true && (
            <TouchableOpacity
              style={appStyles.SortShowArea}
              onPress={() =>this.props.SortShow() }
            >
              <Icon style={appStyles.sorting} name="sort" type="MaterialIcons" />
             
            </TouchableOpacity>
          )}

          {this.props.setCart == true && (
            <TouchableOpacity
              style={appStyles.cartIconArea}
              onPress={() => totalItem > 0 ? this.props.cartPage() : ''}
            >
              <Icon style={appStyles.cartIcon} name="cart" />
              {totalItem > 0 && (
                <Text style={appStyles.cartCount}>{totalItem}</Text>
              )}
            </TouchableOpacity>
          )}

        {this.props.setSearch != false && (
          <TouchableOpacity
            style={appStyles.StyleIconRightS}
            onPress={() => this.onPressSearch()}
          >
            <Icon
              style={[appStyles.IconsRight, this.props.IconsRight]}
              name={this.props.IconRightF}
            />
          </TouchableOpacity>
        )}
        </Right>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalItem: state.cart.totalItem
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => {
      dispatch({ type: ActionTypes.SHOWMODAL, showModal: true });
    },
    cartPage: () => dispatch(NavigationActions.navigate({ routeName: Screens.MyCart.route })),
    onPress: () => dispatch(NavigationActions.back()),
    searchPage: (text) => dispatch(NavigationActions.navigate({ routeName: Screens.SearchProduct.route, params:{text:text } })),

  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);
