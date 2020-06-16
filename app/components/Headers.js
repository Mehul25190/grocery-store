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
  render() {

    const CheckedOption = (props) => (
      <MenuOption
        onSelect={() => alert(props.text)}
        value={props.value}
        text={(props.checked ? "\u2713 " : "    ") + " " + props.text}
      />
    );
    const { searcBar } = this.state;
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
              this.props.onChangeSearchText(text)
              }}
              value={this.props.textValue}
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
                <CheckedOption value={1} text="Pending" />
                <CheckedOption checked value={2} text="In Process" />
                <CheckedOption value={3} text="Delivered" />
                <CheckedOption value={4} text="Canceled" />
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
                  color: "#D2EAD2",
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

          {this.props.setCart == true && (
            <TouchableOpacity
              style={appStyles.cartIconArea}
              onPress={() => this.props.cartPage()}
            >
              <Icon style={appStyles.cartIcon} name="cart" />
              {cartCount > 0 && (
                <Text style={appStyles.cartCount}>{cartCount}</Text>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={appStyles.StyleIconRightS}
            onPress={() => this.onPressSearch()}
          >
            <Icon
              style={[appStyles.IconsRight, this.props.IconsRight]}
              name={this.props.IconRightF}
            />
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => {
      dispatch({ type: ActionTypes.SHOWMODAL, showModal: true });
    },
    cartPage: () =>
      dispatch(NavigationActions.navigate({ routeName: Screens.MyCart.route })),
    onPress: () => dispatch(NavigationActions.back()),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);
