import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import { SignIn, SignInEmail, OrderSuccess, ProductDetail, MyOffers, SubscribeSuccess, CancelOrder, Checkout, DeleteSubscribe, Confirmation, OrderReturnDetail, OrderReturn, MyCart, SubscribeDetail, SubscribeOrder, OrderDetail, TopupWallet, MyOrder,Profile, MyWallet, SignInMobile, MyAddress, ProductList, MyNotification, Verification, SignUp, Forgotpassword,
 MyPayments, MyRatings, Subscription, Home, Drawer, Settings, ModifySubscription, SearchProduct }
 from "../containers";
import { Colors, Screens } from "../constants";

const transitionConfig = () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const width = layout.initWidth;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    });

// drawer stack
const DrawerStack = createDrawerNavigator({
  [Screens.Home.route]: {screen: Home },
   [Screens.MyOrder.route]: {screen: MyOrder},
  [Screens.MyPayments.route]: { screen: MyPayments},
   [Screens.MyRatings.route]: { screen: MyRatings },
   [Screens.MyWallet.route]: { screen: MyWallet },
   [Screens.MyNotification.route]:{ screen: MyNotification },
   [Screens.MyOffers.route]: { screen: MyOffers },
   [Screens.MyAddress.route]:{ screen: MyAddress },
   [Screens.Subscription.route]:{ screen: Subscription },
  [Screens.ProductList.route]: { screen: ProductList },
  [Screens.Settings.route]: { screen: Settings },
  [Screens.Profile.route]: { screen: Profile },
  [Screens.TopupWallet.route]: { screen: TopupWallet },
  [Screens.MyOffers.route]: { screen: MyOffers },
  
}, {
  gesturesEnabled: true,
  // drawerBackgroundColor: 'rgba(255,255,255,.9)',
  drawerType: 'front',
  hideStatusBar: false,
  statusBarAnimation: 'slide',
  overlayColor: Colors.primaryDark,
  contentOptions: {
    activeTintColor: Colors.lightBlack,
    activeBackgroundColor: Colors.primaryLight,
  },
  transitionConfig: transitionConfig,
  contentComponent: (props) => <Drawer {...props} />,
});

const DrawerNavigation = createStackNavigator({
  
  [Screens.DrawerStack.route]: { screen: DrawerStack },
  [Screens.ProductList.route]: { screen: ProductList },
  [Screens.Profile.route]: { screen: Profile },
  [Screens.TopupWallet.route]: { screen: TopupWallet },
  [Screens.OrderDetail.route]: { screen: OrderDetail },
  [Screens.SubscribeOrder.route]: { screen: SubscribeOrder },
  [Screens.CancelOrder.route]: { screen: CancelOrder },
  [Screens.SubscribeDetail.route]: { screen: SubscribeDetail },
  [Screens.MyCart.route]: { screen: MyCart },
  [Screens.OrderReturn.route]: { screen: OrderReturn },
  [Screens.OrderReturnDetail.route]: { screen: OrderReturnDetail },
  [Screens.Confirmation.route]: { screen: Confirmation },
  [Screens.DeleteSubscribe.route]: { screen: DeleteSubscribe },
  [Screens.Checkout.route]: { screen: Checkout },
  [Screens.MyPayments.route]: { screen: MyPayments},
  [Screens.OrderSuccess.route]: { screen: OrderSuccess},
  [Screens.SubscribeSuccess.route]: { screen: SubscribeSuccess},
  [Screens.ProductDetail.route]: { screen: ProductDetail},
  [Screens.ModifySubscription.route] : {screen: ModifySubscription},
  [Screens.SearchProduct.route] : {screen: SearchProduct},
}, {
  headerMode: 'none',
   
  transitionConfig: transitionConfig
});

// login stack
const LoginStack = createStackNavigator({
  [Screens.SignIn.route]: { screen: SignIn },
   [Screens.SignInEmail.route]: { screen: SignInEmail},
   [Screens.SignInMobile.route]: { screen: SignInMobile},
   [Screens.Verification.route]: { screen: Verification},
  [Screens.SignUp.route]: { screen: SignUp},
  [Screens.ForgotPassword.route]: { screen: Forgotpassword },
}, {
  headerMode: 'none',
  initialRouteName: Screens.SignInMobile.route,
  transitionConfig: transitionConfig
});

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  [Screens.SignOutStack.route]: { screen: LoginStack },
  [Screens.SignInStack.route]: { screen: DrawerNavigation }
}, {
  headerMode: 'none',
  title: Screens.Title,
  initialRouteName: Screens.SignOutStack.route,
});

export default PrimaryNav